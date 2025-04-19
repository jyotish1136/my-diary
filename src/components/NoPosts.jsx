import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NoPosts = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[60vh] flex flex-col justify-center items-center text-center px-6">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-3">
        No Posts Available
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        You haven’t created any posts yet. Start by adding your first post.
      </p>
      <button
        onClick={() => navigate("/create-post")}
        className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transform hover:scale-105 transition duration-300"
      >
        <FaPlusCircle className="text-white text-xl" />
        <span className="text-lg font-medium">Create Post</span>
      </button>
    </div>
  );
};

export default NoPosts;
