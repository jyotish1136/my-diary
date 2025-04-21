import React from "react";
import { Plus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/create-post")}
      className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 bg-blue-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default AddButton;
