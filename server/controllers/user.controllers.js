import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email }).select(
      "name email photoUrl role password"
    );
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "365d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photoUrl: user.photoUrl || null,
    };

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to Login" });
  }
};

export const userLogOut = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
      })
      .json({ success: true, message: "Logged out Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to Logout" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res
      .status(200)
      .json({ success: true, message: "User fetched", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get user profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, description } = req.body || {};
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (profilePhoto) {
      if (!profilePhoto.path) {
        return res.status(400).json({
          success: false,
          message: "File path missing in uploaded file.",
        });
      }
      try {
        if (user.photoUrl) {
          const publicId = user.photoUrl.split("/").pop().split(".")[0];
          await deleteMediaFromCloudinary(publicId);
        }
        const cloudResponse = await uploadMedia(profilePhoto.path);
        if (!cloudResponse || !cloudResponse.secure_url) {
          return res
            .status(500)
            .json({ success: false, message: "Cloudinary upload failed" });
        }
        user.photoUrl = cloudResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res
          .status(500)
          .json({ success: false, message: "Uploading to cloud failed" });
      }
    }

    if (name) user.name = name;
    if (description) user.description = description;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("updateProfile error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update profile" });
  }
};
