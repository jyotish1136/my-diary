import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen  dark:bg-gray-900 text-white px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-indigo-500 drop-shadow-lg">
          404
        </h1>
        <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-200">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/home"
          className="mt-6 inline-block px-6 py-3 text-base font-medium bg-indigo-600 hover:bg-indigo-700 rounded-full transition duration-300 shadow-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
