import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/user-provider";

const EditPost = ({ user, onCancel }) => {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const { updateUser, getUser } = useUser();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const response = await updateUser(firstname, lastname);
      console.log(response);
      if (response.status == 200) {
      }
    } catch (error) {}
  };

  return (
    <div className="p-4 max-w-lg mx-3 bg-white shadow-lg rounded-lg dark:bg-gray-900">
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        Edit Profile
      </p>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
          onClick={() => {
            handleUpdate(), onCancel();
          }}
        >
          Update Profile
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPost;
