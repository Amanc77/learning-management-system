import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.ObjectId, ref: "Course", required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    // This will stores the Razorpay ORDER ID
    paymentId: { type: String, required: true },

    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

export const CoursePurchase = mongoose.model(
  "CoursePurchase",
  coursePurchaseSchema
);
