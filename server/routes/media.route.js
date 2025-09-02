import express from "express";
import fs from "fs";
import upload from "../middlewares/multer.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

// Upload video route
router.post("/upload-video", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    // Upload to Cloudinary as a video
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "videos",
    });

    // Remove temporary file from server
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    console.error(error);

    // Delete temp file even if upload fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});

export default router;
