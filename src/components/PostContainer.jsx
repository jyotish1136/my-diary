import React, { useState } from "react";
import Post from "./Post";
import { usePost } from "../store/post-store-provider";
import { useUser } from "../store/user-provider";
import NoPosts from "./NoPosts";

const PostContainer = () => {
  const { postList } = usePost();
  const { user } = useUser();
  const [filter, setFilter] = useState("all");

  const filteredPosts = postList.filter((post) => {
    if (filter === "mine") {
      return user?.id && post.userid === user.id;
    }
    return true;
  });

  return (
    <div className="min-h-screen dark:bg-gray-900 px-4 py-6 flex flex-col items-center">
      {/* Toggle Component */}
      <div className="inline-flex rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2 text-sm font-medium rounded-md focus:outline-none transition-colors duration-200 ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setFilter("mine")}
          className={`px-5 py-2 text-sm font-medium rounded-md focus:outline-none transition-colors duration-200 ${
            filter === "mine"
              ? "bg-blue-600 text-white"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          My Posts
        </button>
      </div>

      {/* Display Posts */}
      {filteredPosts.length === 0 ? (
        <div className="mt-10">
          <NoPosts />
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center space-y-6 w-full max-w-3xl">
          {filteredPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
