import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { usePost } from "../store/post-store-provider";
import { useAuth } from "../context/AuthContext";

const PostContainer = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userAuthenticated } = useAuth();
  const { postList } = usePost();

  useEffect(() => {
    if (!userAuthenticated) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300); // Simulate loading time
  }, [userAuthenticated, postList]);

  if (!userAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
        <h1 className="text-center text-gray-400 text-lg">
          Please log in to view posts.
        </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-center text-gray-400 text-lg">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-center text-red-500 text-lg">
          Something went wrong. Try again.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 px-4 py-6 flex flex-col items-center">
      {postList.length === 0 ? (
        <div className="text-center mt-20 border-2 border-slate-100 rounded-2xl p-6 shadow-2xl">
          <h1 className="dark:text-white text-xl md:text-2xl">
            No posts available
          </h1>
          <button
            className="bg-blue-500 text-white px-5 py-2 rounded mt-4 hover:bg-blue-600 transition"
            onClick={() => navigate("/create-post")}
          >
            Add Notes
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6 w-full max-w-xl">
          {postList.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
