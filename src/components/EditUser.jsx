import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/user-provider";

const EditUser = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const response = await updateUser(firstname, lastname);
      if (response.status === 200) {
        navigate("/user-profile");
      }
    } catch (error) {
      console.error("Failed to update: ", error.message);
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
          Edit Profile
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
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

export default EditUser;
