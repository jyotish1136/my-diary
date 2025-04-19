import React from "react";
import Post from "./Post";
import { usePost } from "../store/post-store-provider";
import { useUser } from "../store/user-provider";
import NoPosts from "./NoPosts";

const PostContainer = () => {
  const { postList } = usePost();

  return (
    <div className="min-h-screen dark:bg-gray-900 px-4 py-6 flex flex-col items-center">
      {postList.length === 0 ? (
        <NoPosts />
      ) : (
        <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
          {postList.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
