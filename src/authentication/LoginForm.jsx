import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { signupWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const success = await login(username, password);
      if (success.status == 200) {
        navigate("/");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      if (error.response) {
        const messages = {
          401: "Invalid username or password",
          404: "User not found",
          default: "Something went wrong",
        };
        setError(messages[error.response.status] || messages.default);
      } else {
        setError("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-300">
        <h3 className="text-center text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Welcome Back
        </h3>

        {error && (
          <div className="bg-red-500 text-white text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={signupWithGoogle}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          >
            <FaGoogle className="mr-2" /> Login with Google
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
