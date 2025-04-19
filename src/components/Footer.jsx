import React from "react";

const Footer = () => {
  return (
    <footer className="hidden md:block dark:bg-gray-900 dark:text-gray-300 py-6 w-full">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} My Notes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
