import React, { useState } from "react";
import { useUser } from "../store/user-provider";

const EditProfileModal = ({ initialUser }) => {
  const { updateUser } = useUser();
  const [firstname, setFirstname] = useState(initialUser.firstname || "");
  const [lastname, setLastname] = useState(initialUser.lastname || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(firstname, lastname);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg dark:bg-gray-900">
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
            handleSubmit();
          }}
        >
          Update Profile
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
