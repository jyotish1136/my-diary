import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../store/user-provider";
import { usePost } from "../store/post-store-provider";
import KebabMenuProfile from "./KebabMenuProfile";
const UserProfile = () => {
  const { logout, userAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { getUser } = useUser();
  const { postList } = usePost();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
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
          <KebabMenuProfile user={user} />
        </div>

        <div className="flex flex-col items-center mt-2">
          <h4 className="text-2xl font-semibold">
            {user?.firstname} {user?.lastname}
          </h4>
          <p className="text-gray-700 dark:text-white">{user?.username}</p>
        </div>

        <div className="flex justify-around my-6">
          <Link to="/home" className="text-center text-white">
            <h5 className="text-2xl text-gray-700 dark:text-white font-bold">
              {postList.length}
            </h5>
            <h6 className="text-gray-700 dark:text-white">Posts</h6>
          </Link>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
            onClick={() => {
              logout();
              navigate("/home");
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
