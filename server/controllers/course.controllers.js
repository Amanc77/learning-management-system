import { Course } from "../models/course.model.js";
import { uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, courseCategory } = req.body;
    if (!courseTitle || !courseCategory) {
      return res.status(400).json({
        success: false,
        message: "Course title and courseCategory are required.",
      });
    }

    const course = await Course.create({
      courseTitle,
      courseCategory,
      creator: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

// Search course
export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;

    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { courseCategory: { $regex: query, $options: "i" } },
      ],
    };

    if (categories.length > 0) {
      searchCriteria.courseCategory = { $in: categories };
    }

    const sortOptions = {};
    if (sortByPrice === "low") sortOptions.coursePrice = 1;
    if (sortByPrice === "high") sortOptions.coursePrice = -1;

    const courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.error("Error searching course:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all published courses
export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching published courses:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get courses created by logged in user
export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching creator courses:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get single course by id
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    return res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Edit course
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      courseTitle,
      coursePrice,
      courseCategory,
      courseLevel,
      subTitle,
      description,
    } = req.body;

    const thumbnail = req.file;

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    let courseThumbnail = course.courseThumbnail;
    if (thumbnail) {
      const uploadedImage = await uploadMedia(thumbnail.path);
      courseThumbnail = uploadedImage.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseTitle,
        subTitle,
        description,
        courseCategory,
        courseLevel,
        coursePrice,
        courseThumbnail,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error editing course:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deleted = await Course.findByIdAndDelete(courseId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Course removed successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
