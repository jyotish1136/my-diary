import React, { useEffect, useState } from "react";
import KebabMenu from "./KebabMenu";
import { formatDistanceToNow } from "date-fns";
import { Heart, HeartFill, ChatDotsFill } from "react-bootstrap-icons";
import { usePost } from "../store/post-store-provider";
import { useUser } from "../store/user-provider";

const Post = ({ post }) => {
  const { getUser } = useUser();
  const [currUser, setCurrUser] = useState(null);
  const { manageLike, addComment, deleteComment } = usePost();
  const [likes, setLikes] = useState(post.likeCount || 0);
  const [liked, setLiked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);

  const loadUser = async () => {
    try {
      const response = await getUser();
      if (response.status === 200) {
        setCurrUser(response.data);
      }
    } catch (error) {
      console.error("Failed to load user", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!currUser || !currUser.id) return;

    const userAlreadyLiked = post.likedUsers?.some(
      (u) => u.userId === currUser.id && u.postId === post.id
    );
    setLiked(userAlreadyLiked);
  }, [post.likedUsers, currUser]);

  const formatDate = (isoString) => {
    if (!isoString) return "Unknown date";
    return formatDistanceToNow(new Date(isoString), { addSuffix: true });
  };

  const handleLike = async () => {
    if (loading || !currUser) return;
    setLoading(true);

    try {
      setLikes((prev) => (liked ? Math.max(prev - 1, 0) : prev + 1));
      setLiked(!liked);
      await manageLike(currUser.id, post.id);
    } catch (error) {
      console.error("Like/unlike failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleDeleteComment = async (comment) => {
    try {
      const response = await deleteComment(comment);
      if (response.status === 200) {
        setComments((prev) => prev.filter((c) => c !== comment));
      }
    } catch (error) {
      console.error("Delete comment error:", error);
    }
  };

  const handleCommentPost = async () => {
    try {
      const response = await addComment(currUser.id, post.id, commentInput);
      if (response.status === 200) {
        const newComment = response.data;
        setComments([newComment, ...comments]);
        setCommentInput("");
      }
    } catch (error) {
      console.error("Add comment error:", error);
    }
  };

  if (!currUser) return <p className="text-white text-2xl">Loading...</p>;
  return (
    <div className="w-full max-w-3xl mx-auto sm:mx-0">
      <div className=" bg-white dark:bg-gray-800 dark:text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={post?.avatar || "/default-avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{post?.username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(post.date)}
              </p>
            </div>
          </div>
          {post.userid === currUser.id && <KebabMenu post={post} />}
        </div>
        <hr className="border-gray-200 dark:border-gray-600 my-2" />
        <div className="text-center">
          <h3 className="text-lg font-semibold break-words mb-2">
            {post.title}
          </h3>
        </div>
        <hr className="border-gray-200 dark:border-gray-600 my-2" />
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line break-words">
          {post.content}
        </p>

        <div className="flex items-center space-x-4 mt-4">
          <button
            onClick={handleLike}
            className="focus:outline-none"
            disabled={loading}
          >
            {liked ? (
              <HeartFill className="text-red-500 w-5 h-5" />
            ) : (
              <Heart className="w-5 h-5" />
            )}
          </button>
          <span className="text-sm">
            {likes} {likes === 1 ? "like" : "likes"}
          </span>

          <button onClick={handleToggleComments}>
            <ChatDotsFill
              className={`w-5 h-5 ${
                showComments ? "text-blue-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
        {Array.isArray(post.hashtags) && post.hashtags.length > 0 && (
          <>
            <hr className="border-gray-200 dark:border-gray-600 my-3" />
            <div className="flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              {post.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full
          ${
            index % 5 === 0
              ? "bg-blue-200 text-blue-900"
              : index % 5 === 1
              ? "bg-green-200 text-green-900"
              : index % 5 === 2
              ? "bg-purple-200 text-purple-900"
              : index % 5 === 3
              ? "bg-yellow-200 text-yellow-900"
              : "bg-pink-200 text-pink-900"
          }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <hr className="border-gray-200 dark:border-gray-600 my-3" />
          </>
        )}

        {showComments && (
          <>
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-1.5 rounded-xl outline-none"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-600 transition-all duration-200"
                onClick={handleCommentPost}
              >
                Post
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <h1 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
                Comments
              </h1>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start space-x-3 ml-5"
                >
                  <img
                    src={comment.avatar || "/default-avatar.png"}
                    className="w-9 h-9 rounded-full object-cover"
                    alt="comment avatar"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {comment.username}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                      {comment.comment}
                    </p>
                    {comment.username === currUser.username && (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 space-x-4">
                        <button
                          onClick={() => handleDeleteComment(comment)}
                          className="hover:underline text-red-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
