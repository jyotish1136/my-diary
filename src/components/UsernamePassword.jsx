import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/user-provider";
import { Eye, EyeOff } from "lucide-react";

const UsernamePassword = () => {
  const navigate = useNavigate();
  const { user, updateUsernamePassword, validateUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

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

    if (username !== user?.username) {
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
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700 dark:text-white">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Edit Username & Password
        </h2>

        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError("");
              setUsernameSuccess("");
            }}
            onBlur={handleUsernameValidation}
            className={`w-full px-4 py-2 border rounded-md ${
              usernameError ? "border-red-500" : "border-gray-300"
            } dark:bg-gray-700 dark:text-white`}
          />
          {usernameError && (
            <p className="text-red-500 text-sm mt-1">{usernameError}</p>
          )}
          {usernameSuccess && (
            <p className="text-green-500 text-sm mt-1">{usernameSuccess}</p>
          )}
        </div>

        {/* Password input */}
        <div className="relative w-full mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 pr-12 border rounded-md border-gray-300 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password validation */}
        {password.length > 0 && password.length < 6 && (
          <p className="text-red-500 text-sm">
            Password must be at least 6 characters.
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-6">
          <button
            onClick={handleUpdate}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/user-profile")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsernamePassword;
