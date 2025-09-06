import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserLogo from "@/assets/user.jpg";
import Course from "./CourseCard";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { setUser } from "@/redux/authSlice";
import MyLearning from "./MyLearning";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [input, setInput] = useState({
    name: user?.name ?? "",
    description: user?.description ?? "",
    file: null,
  });

  useEffect(() => {
    setInput({
      name: user?.name ?? "",
      description: user?.description ?? "",
      file: null,
    });
  }, [user?.name, user?.description]);

  const photoSrc = useMemo(
    () =>
      user?.photoUrl ||
      user?.avatar?.url ||
      user?.profilePhoto?.url ||
      UserLogo,
    [user]
  );

  const enrolledCourses = [1, 2, 3, 4];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files?.[0];
      if (file && file.size > 2 * 1024 * 1024) {
        alert("Please choose an image ≤ 2MB.");
        return;
      }
      setInput((prev) => ({ ...prev, file }));
    } else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.name.trim() || !input.description.trim()) {
      alert("Name and description are required.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", input.name.trim());
      formData.append("description", input.description.trim());
      if (input.file) {
        formData.append("profilePhoto", input.file);
      }

      const { data } = await axiosInstance.put(
        "/user/profile/update",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data?.user) {
        dispatch(setUser(data.user));
      }

      alert(data?.message || "Profile updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile!";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 lg:px-0">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-700 shadow-2xl rounded-2xl mt-2 p-8 mb-5">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={photoSrc}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl font-bold text-blue-400">
              Welcome, {user?.name || "User"}
            </h1>

            <p className="text-lg text-gray-300 mt-3">
              <span className="font-bold">Email :</span>{" "}
              {user?.email || "email not found"}
            </p>

            <p className="text-gray-300 my-1 capitalize">
              <span className="font-bold">Role :</span>{" "}
              {user?.role || "Instructor"}
            </p>

            <p className="text-gray-300 text-base leading-relaxed mb-3">
              <span className="font-bold">Bio :</span>{" "}
              {user?.description || "Add your description"}
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 mt-4 rounded-lg shadow-md">
                  Edit Profile
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-lg rounded-2xl shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-center text-indigo-400">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-gray-400 text-center">
                    Update your details to keep your profile up-to-date.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={input.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="col-span-3 bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label
                      htmlFor="description"
                      className="text-right text-gray-300 mt-2"
                    >
                      Description
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      value={input.description}
                      onChange={handleChange}
                      placeholder="Write a short description..."
                      className="col-span-3 bg-gray-800 border border-gray-600 rounded-md p-2 text-white resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label
                      htmlFor="file"
                      className="text-right text-gray-300 mt-2"
                    >
                      Picture
                    </Label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="col-span-3 bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                    />
                  </div>

                  <DialogFooter className="mt-6 flex justify-end gap-3">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 border-gray-600 text-white"
                        disabled={submitting}
                      >
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-6"
                      disabled={submitting}
                    >
                      {submitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div>
        <MyLearning />
      </div>
    </div>
  );
};

export default Profile;
