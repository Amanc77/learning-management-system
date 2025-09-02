import React, { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { Progress } from "../../../components/ui/progress";
import { toast } from "sonner";
import axiosInstance from "../../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";

const UpdateLecture = () => {
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  /// Fetch lecture details
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await axiosInstance.get(
          `/course/getLectureById/${lectureId}`
        );
        if (response.data.success) {
          const lec = response.data.lecture;
          setTitle(lec.lectureTitle || "");
          setIsFree(lec.isPreviewFree || false);
          if (lec.videoUrl) {
            setFileName(lec.videoUrl.split("/").pop());
            setUploadVideoInfo({
              videoUrl: lec.videoUrl,
              publicId: lec.publicId,
            });
          }
        } else {
          toast.error("Lecture not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load lecture");
      }
    };
    fetchLecture();
  }, [lectureId]);

  // Handle file upload
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setMediaProgress(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        "/media/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: ({ loaded, total }) =>
            setUploadProgress(Math.round((loaded * 100) / total)),
        }
      );

      if (response.data.success) {
        setUploadVideoInfo({
          videoUrl: response.data.data.url,
          publicId: response.data.data.public_id,
        });
        setUploadProgress(100);
        toast.success("Video uploaded successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload video");
    } finally {
      setTimeout(() => setMediaProgress(false), 500);
    }
  };

  // Remove lecture
  const removeLectureHandler = async () => {
    try {
      const response = await axiosInstance.delete(
        `/course/removeLecture/${lectureId}`
      );
      if (response.data.success) {
        toast.success("Lecture removed");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove lecture");
    }
  };

  // Update lecture
  const updateLectureHandler = async (e) => {
    e.preventDefault();
    if (!title || !uploadVideoInfo) {
      toast.error("Title and video are required");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        lectureTitle: title,
        isPreviewFree: isFree,
        videoInfo: uploadVideoInfo,
      };

      const response = await axiosInstance.put(
        `/course/${courseId}/updateLecture/${lectureId}`,
        payload
      );

      if (response.data.success) {
        toast.success("Lecture updated successfully");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex items-start justify-center py-6 px-4">
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <BackButton />
          <h1 className="text-2xl font-semibold">Update Your Lecture</h1>
        </div>

        <form
          onSubmit={updateLectureHandler}
          className="bg-gray-700 border border-gray-800 rounded-lg shadow-sm p-6 space-y-6"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-medium">Edit Lecture</h2>
            <p className="text-sm text-gray-400">
              Make changes and click save when done.
            </p>
          </div>

          <div>
            <Button
              variant="destructive"
              type="button"
              onClick={removeLectureHandler}
            >
              Remove Lecture
            </Button>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lecture title"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="video">
              Video <span className="text-red-400">*</span>
            </Label>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-600">
                <span className="">Choose File</span>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={fileChangeHandler}
                />
              </label>
              <span className="text-sm text-gray-300">
                {fileName || "No file chosen"}
              </span>
            </div>
          </div>

          {/* Free Switch */}
          <div className="flex items-center gap-3">
            <Switch checked={isFree} onCheckedChange={setIsFree} />
            <Label>Is this video FREE?</Label>
          </div>

          {/* Progress */}
          {mediaProgress && (
            <div className="my-4 w-full">
              <Progress value={uploadProgress} />
              <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
            </div>
          )}

          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Lecture"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLecture;
