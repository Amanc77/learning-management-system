import { Button } from "@/components/ui/button";
import UserLogo from "@/assets/user.jpg";

const Profile = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 lg:px-0">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-700 shadow-2xl rounded-2xl mt-14 p-8">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">
          {/* Profile Picture */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={UserLogo}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl font-bold text-blue-400">Welcome, User</h1>
            <p className="text-lg text-gray-300 mt-3">
              <span className="font-bold">Email :</span> demo@gmail.com
            </p>
            <p className="text-gray-300 my-1 capitalize">
              <span className="font-bold">Role :</span> Instructor
            </p>
            <p className="text-gray-300 text-base leading-relaxed mb-3">
              <span className="font-bold">Bio :</span> Add your bio
            </p>

            <Button className="bg-blue-500 hover:bg-blue-600">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
