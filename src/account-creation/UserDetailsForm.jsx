import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../store/user-provider";

const UserDetailsForm = () => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });
  const validate = () => {
    const tempErrors = {};

    if (!formData.firstname.trim())
      tempErrors.firstname = "First name is required!";
    if (!formData.lastname.trim())
      tempErrors.lastname = "Last name is required!";
    if (!formData.password.trim() || formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters!";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(
        formData.firstname,
        formData.lastname,
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
      console.error("Error updating user:", error);
      navigate("/show-alert", {
        state: { message: "Network error! Please try again.", type: "error" },
      });
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
