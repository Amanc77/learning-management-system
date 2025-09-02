import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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
      return res.status(404).json({ success: false });
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

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle } = req.body;

    console.log("courseId is:", courseId);
    console.log("lectureTitle is:", lectureTitle);

    if (!courseId || !lectureTitle) {
      return res.status(400).json({
        success: false,
        message: "Course ID and Lecture title are required.",
      });
    }

    // create new lecture
    const newLecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(newLecture._id);
      await course.save();
    }

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully.",
      newLecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create lecture.",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        success: false,
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lecture.",
    });
  }
};
export const updateLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found!" });
    }

    // Update lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure course has lecture ID
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      success: true,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lecture.",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res
        .status(404)
        .json({ message: "lecture not found", success: false });
    }

    const deleted = await Lecture.findByIdAndDelete(lectureId);

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to delete lecture" });
    }

    return res
      .status(200)
      .json({ success: true, message: "lecture deleted successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete lecture." });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true, lecture });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to get lecture by Id." });
  }
};
