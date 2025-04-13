import React, { useState } from "react";
import { usePost } from "../store/post-store-provider";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { addPost } = usePost();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(false);
    try {
      const response = await addPost(title, content);
      if (response.status == 200) {
        navigate("/home");
      }
      setTitle("");
      setContent("");
    } catch (error) {
      setError(true);
      console.error("Network error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="shadow-lg p-6 rounded-2xl max-w-md w-full bg-white dark:bg-gray-800">
        <h4 className="text-center mb-4 text-black dark:text-white text-xl font-semibold">
          Create Post
        </h4>

        {uploading && (
          <h5 className="text-center text-yellow-500">Uploading post...</h5>
        )}
        {error && (
          <h5 className="text-center text-red-500">Something went wrong</h5>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              rows="4"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-400"
            disabled={uploading}
          >
            {uploading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
