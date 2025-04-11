import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="text-center">
        <h1 className="font-bold text-4xl mb-3">Welcome to My Notes</h1>
        <p className="text-lg">
          Securely store, organize, and manage your notes with ease.
        </p>
        <div className="mt-4 flex flex-row space-x-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
