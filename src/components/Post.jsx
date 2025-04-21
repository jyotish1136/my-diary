import React, { useEffect, useState } from "react";
import KebabMenu from "./KebabMenu";
import { formatDistanceToNow } from "date-fns";
import { Heart, HeartFill, ChatDotsFill } from "react-bootstrap-icons";
import { useUser } from "../store/user-provider";
import { useLikeComment } from "../store/comment-provider";

const Post = ({ post }) => {
  const { user } = useUser();
  const { manageLike, addComment, deleteComment, loadComment } =
    useLikeComment();
  const [likes, setLikes] = useState(post.likeCount || 0);
  const [commentCounts, setCommentCount] = useState(post.commentCount || 0);
  const [liked, setLiked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!user || !user.id) return;

    const userAlreadyLiked = post.likedUsers?.some(
      (u) => u.userId === user.id && u.postId === post.id
    );
    setLiked(userAlreadyLiked);
  }, [post.likedUsers, user]);

  const formatDate = (isoString) => {
    if (!isoString) return "Unknown date";
    return formatDistanceToNow(new Date(isoString), { addSuffix: true });
  };

  const handleLike = async () => {
    if (loading || !user) return;
    setLoading(true);

    try {
      setLikes((prev) => (liked ? Math.max(prev - 1, 0) : prev + 1));
      setLiked(!liked);
      await manageLike(user.id, post.id);
    } catch (error) {
      console.error("Like/unlike failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComments = async () => {
    setShowComments((prev) => !prev);
    if (!comments.length && post.id) {
      await handleOnLoadComments(post.id);
    }
  };

  const handleOnLoadComments = async (postId) => {
    try {
      const response = await loadComment(postId);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const response = await deleteComment(postId, commentId);
      if (response?.status === 200) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        setCommentCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Delete comment error:", error);
    }
  };

  const handleCommentPost = async () => {
    if (!commentInput) return;
    try {
      setLoading(true);
      const response = await addComment(user.id, post.id, commentInput);
      if (response.status === 200) {
        const newComment = response.data;
        setComments([newComment, ...comments]);
        setCommentCount(commentCounts + 1);
        setCommentInput("");
      }
    } catch (error) {
      console.error("Add comment error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-white text-2xl">Loading...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto sm:mx-0">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
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
          {post.userId === user.id && <KebabMenu post={post} />}
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
            className="focus:outline-none flex cursor-pointer"
            disabled={loading}
          >
            {liked ? (
              <HeartFill className="text-red-500 w-5 h-5" />
            ) : (
              <Heart className="w-5 h-5" />
            )}
            <span className="text-sm ml-2">
              {likes >= 0 && likes} {likes <= 1 ? "like" : "likes"}
            </span>
          </button>

          <button
            onClick={handleToggleComments}
            className="flex cursor-pointer"
          >
            <ChatDotsFill
              className={`w-5 h-5 ${
                showComments ? "text-blue-500" : "text-gray-500"
              }`}
            />
            <span className="text-sm ml-2">
              {commentCounts >= 0 && commentCounts}{" "}
              {commentCounts <= 1 ? "comment" : "comments"}
            </span>
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
                disabled={loading}
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
                    {comment.username === user.username && (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 space-x-4">
                        <button
                          onClick={() =>
                            handleDeleteComment(post.id, comment.id)
                          }
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
