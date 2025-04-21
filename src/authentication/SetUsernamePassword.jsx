import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/user-provider";
import { Eye, EyeOff } from "lucide-react";

const SetUsernamePassword = () => {
  const navigate = useNavigate();
  const { updateUsernamePassword, validateUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");

  const handleUpdate = async () => {
    if (
      usernameError ||
      username.length < 4 ||
      (password && password.length < 6)
    ) {
      alert("Fix errors before submitting.");
      return;
    }

    try {
      const response = await updateUsernamePassword(username, password);
      if (response.status === 200) {
        navigate("/show-alert", {
          state: {
            message: "Profile updated successfully! Please login",
            type: "success",
          },
        });
      }
    } catch (error) {
      console.error("Failed to update: ", error.message);
    }
  };

  const handleUsernameValidation = async () => {
    setUsernameError("");
    setUsernameSuccess("");

    if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters.");
      return;
    }

    if (!/^[a-z0-9._]+$/.test(username)) {
      setUsernameError(
        "Only lowercase letters, numbers, '.', and '_' are allowed."
      );
      return;
    }

    try {
      const response = await validateUser(username);
      if (response.status === 200 && response.data.exists) {
        setUsernameError("Username is already taken.");
      } else {
        setUsernameSuccess("Username is available!");
      }
    } catch (error) {
      setUsernameError("Error checking username.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          Username & Password
        </h2>

        {/* Username Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError("");
              setUsernameSuccess("");
            }}
            onBlur={handleUsernameValidation}
            className={`w-full px-4 py-2 rounded-lg border ${
              usernameError
                ? "border-red-500"
                : usernameSuccess
                ? "border-green-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
          />
          {usernameError && (
            <p className="text-sm text-red-500 mt-1">{usernameError}</p>
          )}
          {usernameSuccess && (
            <p className="text-sm text-green-500 mt-1">{usernameSuccess}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {password.length > 0 && password.length < 6 && (
            <p className="text-sm text-red-500 mt-1">
              Password must be at least 6 characters.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SetUsernamePassword;
