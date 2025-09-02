import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Edit } from "lucide-react";

function DisplayLectures({ lectures }) {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div className="mt-8">
      {!lectures || lectures.length === 0 ? (
        <p className="text-gray-400 mt-8 text-center">
          No lectures available. Create your first lecture!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          {lectures.map((lecture, index) => (
            <div
              key={lecture._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-700 px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="mb-2 sm:mb-0 font-medium text-white">
                Lecture {index + 1}: {lecture.lectureTitle}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="hover:bg-gray-500"
                onClick={() =>
                  navigate(`/admin/courses/${courseId}/lecture/${lecture._id}`)
                }
              >
                <Edit size={18} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DisplayLectures;
