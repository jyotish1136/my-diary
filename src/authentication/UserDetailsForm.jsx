import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../store/user-provider";
import { useAuth } from "../context/AuthContext";

const UserDetailsForm = () => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");
  const navigate = useNavigate();
  const { validateUser } = useUser();
  const { signup } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("tempToken");
    if (token != null && token != "") {
      setTempToken(token);
    }
  }, []);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(
        tempToken,
        formData.firstname,
        formData.lastname,
        username,
        formData.password
      );
      if (response.status == 200) {
        navigate("/show-alert", {
          state: {
            message: "Successfully updated details",
            type: "success",
          },
        });
      } else {
        navigate("/show-alert", {
          state: {
            message: "Failed to update details",
            type: "failed",
          },
        });
      }
    } catch (error) {
      console.error("Error signup user:", error);
      navigate("/show-alert", {
        state: { message: "Network error! Please try again.", type: "error" },
      });
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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-5">
          Fill Your Details
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstname", "lastname"].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-sm capitalize">
                {field}{" "}
                {field === "firstname" && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg ${
                  errors[field] && "border-red-500"
                }`}
              />
              {errors[field] && (
                <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="relative w-full mb-4">
            <label className="block mb-1 text-sm capitalize">
              username
              <span className="text-red-500">*</span>
            </label>
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
          <div className="relative">
            <label className="block mb-1 text-sm">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 pr-10 bg-gray-700 border rounded-lg ${
                errors.password && "border-red-500"
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
