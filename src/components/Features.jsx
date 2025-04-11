import React from "react";

const Features = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 text-white">
      <h2 className="text-center text-3xl font-bold mb-4">Key Features</h2>
      <p className="text-center text-lg text-gray-300">
        Explore the powerful features that make Personal Notes the best place to
        store, organize, and share your thoughts securely.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="text-blue-400 text-xl font-semibold">
            📝 Easy Note-Taking
          </h4>
          <p className="text-gray-300">
            Quickly create, edit, and organize notes with a user-friendly
            interface.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="text-blue-400 text-xl font-semibold">
            🔒 Privacy & Security
          </h4>
          <p className="text-gray-300">
            Your notes are encrypted and stored securely to protect your data.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="text-blue-400 text-xl font-semibold">
            📂 Categorization
          </h4>
          <p className="text-gray-300">
            Organize your notes using categories and tags for easy access.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="text-blue-400 text-xl font-semibold">
            🔍 Search & Filter
          </h4>
          <p className="text-gray-300">
            Find notes instantly using the powerful search and filtering
            options.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="text-blue-400 text-xl font-semibold">
            📤 Share Notes
          </h4>
          <p className="text-gray-300">
            Share notes with others via public links or invite collaborators.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="text-blue-400 text-xl font-semibold">🌙 Dark Mode</h4>
          <p className="text-gray-300">
            Enjoy a sleek dark mode experience for reduced eye strain.
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h4 className="text-blue-400 text-2xl font-semibold">
          Start Using Personal Notes Today
        </h4>
        <p className="text-gray-300">
          Sign up now and take control of your note-taking experience!
        </p>
      </div>
    </div>
  );
};

export default Features;
