import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto  text-gray-100 p-8">
      {/* About Section */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-center text-2xl font-semibold mb-4">
          About Personal Notes
        </h2>
        <p className="text-center text-lg">
          Personal Notes is your go-to app for securely storing, organizing, and
          sharing notes. Whether you need a private journal, a place to track
          tasks, or a collaborative workspace, we've got you covered.
        </p>
      </div>

      {/* Why Choose Section */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
        <h4 className="text-blue-400 text-xl font-semibold">
          Why Choose Personal Notes?
        </h4>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>✔ Secure and encrypted note storage</li>
          <li>✔ Categorize notes for better organization</li>
          <li>✔ Private, public, and shared note options</li>
          <li>✔ Search functionality for quick access</li>
          <li>✔ Mobile responsive for easy access anywhere</li>
        </ul>
      </div>

      {/* Mission Section */}
      <div className="mt-6">
        <h4 className="text-blue-400 text-xl font-semibold">Our Mission</h4>
        <p className="bg-gray-900 p-6 rounded-lg shadow-lg mt-3">
          We aim to provide a seamless and secure note-taking experience that
          adapts to your needs. From simple thoughts to critical work documents,
          Personal Notes keeps everything in one place with top-tier security.
        </p>
      </div>

      {/* Get Started Section */}
      <div className="mt-6">
        <h4 className="text-blue-400 text-xl font-semibold">
          Get Started Today
        </h4>
        <p className="bg-gray-900 p-6 rounded-lg shadow-lg mt-3">
          Join thousands of users who trust Personal Notes for their daily
          note-taking needs. Sign up now and experience a smarter way to
          organize your thoughts.
        </p>
      </div>
    </div>
  );
};

export default About;
