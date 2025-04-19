import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../store/post-store-provider";

const EditPost = ({ post, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [privacy, setPrivacy] = useState(post.privacy || "PRIVATE");
  const [hashtagsStr, setHashtags] = useState(post.hashtags?.join(" ") || "");
  const { updatePost } = usePost();

  const handleUpdate = async () => {
    const hashtags = hashtagsStr
      .split(" ")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    await updatePost(post.id, title, content, privacy, hashtags);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg dark:bg-gray-900">
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        Edit Post
      </p>

      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        placeholder="e.g hello post enjoy"
        value={hashtagsStr}
        onChange={(e) => setHashtags(e.target.value)}
      />

      <div className="mb-4">
        <label
          htmlFor="privacy"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Post Visibility
        </label>
        <select
          id="privacy"
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>

      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
          onClick={() => {
            handleUpdate();
            onCancel();
          }}
        >
          Update Post
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
