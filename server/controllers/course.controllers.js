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

// search corse
export const searchCourse = async (req, res) => {
  try {
    const {
      query = "",
      categories: rawCategories,
      sortByPrice = "",
      minPrice,
      maxPrice,
    } = req.query;

    // Parse categories
    let categories = [];
    if (rawCategories) {
      if (Array.isArray(rawCategories)) categories = rawCategories;
      else if (typeof rawCategories === "string") {
        try {
          const parsed = JSON.parse(rawCategories);
          categories = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          categories = rawCategories
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
    }

    const visibilityCond = { $or: [{ isPublished: true }, { isPublic: true }] };
    const andConditions = [visibilityCond];

    // Text search
    if (query && query.trim()) {
      const regex = { $regex: query.trim(), $options: "i" };
      andConditions.push({
        $or: [
          { courseTitle: regex },
          { subTitle: regex },
          { courseCategory: regex },
        ],
      });
    }

    // Category filter
    if (categories.length > 0) {
      andConditions.push({ courseCategory: { $in: categories } });
    }

    // Price filter
    const priceFilter = {};
    if (minPrice) priceFilter.$gte = Number(minPrice);
    if (maxPrice) priceFilter.$lte = Number(maxPrice);
    if (Object.keys(priceFilter).length > 0) {
      andConditions.push({ coursePrice: priceFilter });
    }

    // Combine conditions
    const finalQuery =
      andConditions.length === 1 ? andConditions[0] : { $and: andConditions };

    // Sorting
    const sortObj = {};
    const s = String(sortByPrice || "").toLowerCase();
    if (["low", "lowtohigh", "low-to-high"].includes(s))
      sortObj.coursePrice = 1;
    if (["high", "hightolow", "high-to-low"].includes(s))
      sortObj.coursePrice = -1;

    const courses = await Course.find(finalQuery)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortObj);

    return res.status(200).json({ success: true, courses: courses || [] });
  } catch (error) {
    console.error("Error searching course:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
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
      isPublished,
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
        isPublished,
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

export const togglePublicCourse = async (req, res) => {
  try {
    const courseId = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "course not found" });
    }

    course.isPublished = publish === "true";
    course.save();

    const statusMessage = course.isPublished ? "Published" : "UnPublished";
    return res.status(200).json({
      success: true,
      message: `course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update status" });
  }
};
export const getPublicCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId, isPublished: true })
      .populate("lectures")
      .populate({ path: "creator", select: "name photoUrl" });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or not published",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Error fetching public course:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public course",
    });
  }
};

// get purchase status

export const getCoursePurchaseStatus = async (req, res) => {
  const userId = req.user._id;
  const { courseId } = req.params;

  const purchased = await Purchase.findOne({ user: userId, course: courseId });

  res.json({ purchased: !!purchased });
};
