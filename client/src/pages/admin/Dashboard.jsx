import { Box } from "lucide-react";
import React from "react";

function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center">
        <Box size={48} className="mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Manage courses and lectures easily</p>
      </div>
    </div>
  );
}

export default Dashboard;
