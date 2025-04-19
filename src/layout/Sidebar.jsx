import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-dark text-white flex-column" style={{ width: "400px" }}>
      <div className="flex-column">
        <Link className="text-white" to="/dashboard">
          Dashboard
        </Link>
        <Link className="text-white" to="/home">
          Home
        </Link>
        <Link className="text-white"></Link>
        <Link className="text-white"></Link>
      </div>
      <div className="profile">
        <img src="#" alt="user" />
        <p>Full Name </p>
        <p>username</p>
      </div>
    </div>
  );
};

export default Sidebar;
