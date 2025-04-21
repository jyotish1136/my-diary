import React from "react";
import { useNavigate } from "react-router-dom";

const UserExists = () => {
  const navigete = useNavigate();
  const handleOnClick = () => {
    navigete("/login");
  };
  return (
    <div className="min-h-screen flex justify-center dark:bg-slate-900 items-center">
      <div
        className="h-20 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md flex items-center w-full max-w-xl relative"
        role="alert"
      >
        <span className="flex-1 text-sm font-medium">User Already Exists</span>
        <button onClick={handleOnClick}>Go to login</button>
      </div>
    </div>
  );
};

export default UserExists;
