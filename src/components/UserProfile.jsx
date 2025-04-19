import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../store/user-provider";
import { usePost } from "../store/post-store-provider";
import KebabMenuProfile from "./KebabMenuProfile";

const UserProfile = () => {
  const { logout, userAuthenticated } = useAuth();
  const { postList } = usePost();
  const navigate = useNavigate();
  const { getUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [inuser, setUser] = useState(null);
  const [error, setError] = useState(null);
  const filteredPosts = postList.filter((post) => {
    return inuser?.id && post.userid === inuser.id;
  });

  const fetchUser = async () => {
    try {
      const response = await getUser();
      if (response.status === 200) {
        setUser(response.data);
      } else {
        setError("User not found.");
      }
    } catch (err) {
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (!userAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-white">
        <h1>Please Login</h1>
        <button
          className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <h2 className="text-center dark:text-white">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <h2 className="text-center text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-gray-900 dark:text-white px-4">
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="absolute top-4 right-4 z-10">
          <KebabMenuProfile user={inuser} />
        </div>

        <div className="flex flex-col items-center mt-2">
          {inuser?.avatar && (
            <img
              src={inuser.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow-md"
            />
          )}
          <h4 className="text-2xl font-semibold">
            {inuser?.firstname} {inuser?.lastname}
          </h4>
          <p className="text-gray-700 dark:text-white">{inuser?.username}</p>
        </div>

        <div className="flex justify-around my-6">
          <Link to="/" className="text-center text-white">
            <h5 className="text-2xl text-gray-700 dark:text-white font-bold">
              {filteredPosts.length}
            </h5>
            <h6 className="text-gray-700 dark:text-white">Posts</h6>
          </Link>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
