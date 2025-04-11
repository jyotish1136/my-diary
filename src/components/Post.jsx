import React from "react";
import KebabMenu from "./KebabMenu";
import { format } from "date-fns";

const Post = ({ post }) => {
  const formatDate = (isoString) => {
    if (!isoString) return "Unknown date";
    return format(new Date(isoString), "dd/MM/yyyy");
  };

  return (
    <div className="w-full max-w-md mx-auto sm:mx-0">
      <div className="dark:bg-gray-800 dark:text-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center">
          <small className="dark:text-gray-400">{formatDate(post.date)}</small>
          <KebabMenu post={post} />
        </div>
        <h3 className="text-xl font-semibold mt-3 break-words">{post.title}</h3>
        <hr className="border-gray-600 my-3" />
        <p className="dark:text-gray-300 whitespace-pre-line break-words">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default Post;
