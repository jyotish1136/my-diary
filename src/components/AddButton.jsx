import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react"; // Importing an icon

const AddButton = () => {
  const { userAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    userAuthenticated && (
      <button
        className="fixed bottom-10 right-10 flex items-center justify-center bg-blue-500 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-600 transition-all duration-300"
        onClick={() => navigate("/create-post")}
      >
        <Plus size={24} />
      </button>
    )
  );
};

export default AddButton;
