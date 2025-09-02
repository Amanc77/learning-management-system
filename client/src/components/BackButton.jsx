import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Back"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-850 hover:bg-gray-700 ring-1 ring-gray-700 shadow-md transition-transform duration-200 hover:scale-105"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-5 w-5 text-gray-100" />
      </Button>
    </div>
  );
}

export default BackButton;
