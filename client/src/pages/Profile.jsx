import { Button } from "@/components/ui/button";
import UserLogo from "@/assets/user.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { useState } from "react";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  console.log("user data is ", user);
  const [input, setInput] = useState({
    name: user?.name,
    description: user?.description,
    file: user?.photoUrl,
  });
  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 lg:px-0">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-700 shadow-2xl rounded-2xl mt-14 p-8">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">
          {/* Profile Picture */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={user?.photoUrl || UserLogo}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
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

            <Dialog>
              <DialogTrigger>
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
                    Update your details to keep your profile up-to-date
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={input.name}
                      placeholder="Enter your name"
                      className="col-span-3 bg-gray-800 border-gray-600 text-white"
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
                      placeholder="Write a short description..."
                      className="col-span-3 bg-gray-800 border border-gray-600 rounded-md p-2 text-white resize-none"
                      rows={3}
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
                      placeholder="Write a short description..."
                      className="col-span-3 bg-gray-800 border border-gray-600 rounded-md p-2 text-white resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    className=" bg-red-500 hover:bg-red-600 border-gray-600 text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6">
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
