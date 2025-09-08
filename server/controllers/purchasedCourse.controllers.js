import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { User } from "../models/user.model.js";

// initialize razorpay
let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });
} catch (err) {
  console.error("Razorpay init failed:", err.message);
  process.exit(1);
}

// create checkout session (order)
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!isValidObjectId(courseId) || !isValidObjectId(userId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid course or user ID" });

    const course = await Course.findById(courseId);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    //if course is already purchased?
    const existing = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Course already purchased" });

    // Normalize price
    const rupees = Number(course.coursePrice ?? course.price ?? 0) || 0;

    //if course is free course then complete immediately
    if (rupees === 0) {
      const purchase = await CoursePurchase.create({
        courseId,
        userId,
        amount: 0,
        status: "completed",
        paymentId: "FREE_COURSE",
      });

      await User.findByIdAndUpdate(userId, {
        $addToSet: { enrolledCourses: courseId },
      });
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: { enrolledStudents: userId },
      });

      return res.status(200).json({
        success: true,
        isFree: true,
        message: "Course enrolled (free).",
        courseId,
      });
    }

    //  if paid then create order
    const amountInRupees = Math.round(rupees * 100);
    const receipt = `course_${courseId.toString().slice(-6)}_${userId
      .toString()
      .slice(-6)}`.slice(0, 40);

    const order = await razorpay.orders.create({
      amount: amountInRupees,
      currency: "INR",
      receipt,
      notes: { courseId: courseId.toString(), userId: userId.toString() },
    });

    // create pending purchase
    await CoursePurchase.create({
      courseId,
      userId,
      amount: rupees,
      status: "pending",
      paymentId: order.id,
    });

    return res.status(200).json({
      success: true,
      isFree: false,
      order_id: order.id,
      amount: rupees,
      key_id: process.env.RAZORPAY_ID_KEY,
      product_name: course.courseTitle,
      description: `Purchase of ${course.courseTitle}`,
      contact: user.phone || "9999999999",
      name: user.name || "Student",
      email: user.email || "student@example.com",
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("createCheckoutSession:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//verify payment
export const verifyPayment = async (req, res) => {
  try {
    const userId = req.id;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    // verify signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expected = hmac.digest("hex");

    if (expected !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Signature verification failed" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // find the pending purchase using order id
      const purchase = await CoursePurchase.findOne({
        paymentId: razorpay_order_id,
      }).session(session);

      if (!purchase) {
        await session.abortTransaction();
        return res
          .status(404)
          .json({ success: false, message: "Purchase record not found" });
      }

      if (purchase.status !== "completed") {
        purchase.status = "completed";
        purchase.razorpayPaymentId = razorpay_payment_id;
        await purchase.save({ session });

        await User.findByIdAndUpdate(
          purchase.userId,
          { $addToSet: { enrolledCourses: purchase.courseId } },
          { session }
        );
        await Course.findByIdAndUpdate(
          purchase.courseId,
          { $addToSet: { enrolledStudents: purchase.userId } },
          { session }
        );
      }

      await session.commitTransaction();
      return res.status(200).json({
        success: true,
        message: "Payment verified and course enrolled",
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("verifyPayment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// webhook fallback
export const razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    if (!signature)
      return res
        .status(400)
        .json({ success: false, message: "Missing signature header" });

    const payload = req.body; // raw Buffer
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const expected = crypto
      .createHmac("sha256", webhookSecret)
      .update(payload)
      .digest("hex");
    if (expected !== signature)
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });

    const event = JSON.parse(payload.toString());

    if (event.event === "payment.captured") {
      const payEntity = event.payload.payment.entity;
      const order_id =
        payEntity.order_id ||
        payEntity.paymentLink?.order_id ||
        payEntity.reference_id;
      const payment_id = payEntity.id;
      const amount = payEntity.amount;

      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const purchase = await CoursePurchase.findOne({
          paymentId: order_id,
        }).session(session);
        if (!purchase) {
          await session.commitTransaction();
          return res.status(200).json({ success: true });
        }

        if (purchase.status !== "completed") {
          purchase.status = "completed";
          purchase.amount = Number(amount) / 100;
          purchase.razorpayPaymentId = payment_id;
          await purchase.save({ session });

          await User.findByIdAndUpdate(
            purchase.userId,
            { $addToSet: { enrolledCourses: purchase.courseId } },
            { session }
          );
          await Course.findByIdAndUpdate(
            purchase.courseId,
            { $addToSet: { enrolledStudents: purchase.userId } },
            { session }
          );
        }

        await session.commitTransaction();
        return res.status(200).json({ success: true });
      } catch (err) {
        await session.abortTransaction();
        console.error("Webhook processing error:", err);
        return res
          .status(400)
          .json({ success: false, message: `Webhook Error: ${err.message}` });
      } finally {
        session.endSession();
      }
    }

    // ignore other events
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("razorpayWebhook:", error);
    return res
      .status(400)
      .json({ success: false, message: `Webhook Error: ${error.message}` });
  }
};

// get single course with purchase status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!isValidObjectId(courseId) || !isValidObjectId(userId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid course or user ID" });

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    const purchased = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });

    return res.status(200).json({
      success: true,
      data: { course, purchased: !!purchased },
      message: "Course details fetched",
    });
  } catch (error) {
    console.error("getCourseDetailWithPurchaseStatus:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// get current user's purchased courses
export const getAllPurchasedCourse = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const purchasedCourse = await CoursePurchase.find({
      userId,
      status: "completed",
    })
      .populate({
        path: "courseId",
        select: "courseTitle courseThumbnail coursePrice",
      })
      .skip(skip)
      .limit(limit);

    const total = await CoursePurchase.countDocuments({
      userId,
      status: "completed",
    });

    return res.status(200).json({
      success: true,
      data: { purchasedCourse, pagination: { page, limit, total } },
      message: "Purchased courses fetched",
    });
  } catch (error) {
    console.error("getAllPurchasedCourse:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getCoursePurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!isValidObjectId(courseId) || !isValidObjectId(userId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid course or user ID" });

    const purchase = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });

    return res.status(200).json({ success: true, purchased: !!purchase });
  } catch (error) {
    console.error("getCoursePurchaseStatus:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
