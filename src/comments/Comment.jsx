import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, HeartFill, ChatDotsFill } from "react-bootstrap-icons";
const Comment = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const formatDate = (isoString) => {
    if (!isoString) return "Unknown date";
    return formatDistanceToNow(new Date(isoString), { addSuffix: true });
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentPost = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      user: { username: user.username, avatar: user.avatar },
      text: commentInput,
      date: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: [],
      showReplyBox: false,
      isEditing: false,
    };

    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  const toggleCommentLike = (commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  };

  const toggleReplyBox = (commentId, replyId = null) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          if (replyId === null) {
            return { ...c, showReplyBox: !c.showReplyBox, replyInput: "" };
          }
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyId
                ? {
                    ...r,
                    showReplyBox: !r.showReplyBox,
                    replyInput: "",
                  }
                : { ...r, showReplyBox: false }
            ),
          };
        }
        return c;
      })
    );
  };

  const handleReplyPost = (commentId, replyText, replyToReplyId = null) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      user: { username: user.username, avatar: user.avatar },
      text: replyText,
      date: new Date().toISOString(),
      isEditing: false,
    };

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          if (replyToReplyId === null) {
            return {
              ...c,
              replies: [...c.replies, reply],
              showReplyBox: false,
              replyInput: "",
            };
          }

          return {
            ...c,
            replies: c.replies
              .map((r) =>
                r.id === replyToReplyId
                  ? { ...r, showReplyBox: false, replyInput: "" }
                  : r
              )
              .concat(reply),
          };
        }
        return c;
      })
    );
  };

  const handleEditChange = (commentId, newText) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, text: newText } : c))
    );
  };

  const toggleEditComment = (commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, isEditing: !c.isEditing } : c
      )
    );
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const handleEditReplyChange = (commentId, replyId, newText) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId ? { ...r, text: newText } : r
              ),
            }
          : c
      )
    );
  };

  const toggleEditReply = (commentId, replyId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId ? { ...r, isEditing: !r.isEditing } : r
              ),
            }
          : c
      )
    );
  };

  const handleDeleteReply = (commentId, replyId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
          : c
      )
    );
  };
  return (
    <div className="mt-4 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-3">
          <img
            src={comment.user.avatar || "/default-avatar.png"}
            className="w-8 h-8 rounded-full object-cover"
            alt="comment avatar"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-sm font-semibold">{comment.user.username}</p>
              <span className="text-xs text-gray-500">
                {formatDate(comment.date)}
              </span>
            </div>

            {comment.isEditing ? (
              <input
                value={comment.text}
                onChange={(e) => handleEditChange(comment.id, e.target.value)}
                className="text-sm w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-1 rounded"
              />
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {comment.text}
              </p>
            )}

            <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
              <button onClick={() => toggleCommentLike(comment.id)}>
                {comment.liked ? "❤️" : "🤍"} {comment.likes}
              </button>
              <button
                onClick={() => toggleReplyBox(comment.id)}
                className="hover:underline"
              >
                Reply
              </button>
              <button
                onClick={() => toggleEditComment(comment.id)}
                className="hover:underline"
              >
                {comment.isEditing ? "Save" : "Edit"}
              </button>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="hover:underline text-red-400"
              >
                Delete
              </button>
            </div>

            {comment.showReplyBox && (
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  value={comment.replyInput || ""}
                  onChange={(e) =>
                    setComments((prev) =>
                      prev.map((c) =>
                        c.id === comment.id
                          ? { ...c, replyInput: e.target.value }
                          : c
                      )
                    )
                  }
                  placeholder="Reply..."
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-1 rounded"
                />
                <button
                  onClick={() =>
                    handleReplyPost(comment.id, comment.replyInput)
                  }
                  className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-600"
                >
                  Post
                </button>
              </div>
            )}

            {/* Replies */}
            {comment.replies?.length > 0 && (
              <div className="pl-4 mt-2 space-y-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start space-x-2">
                    <img
                      src={reply.user.avatar || "/default-avatar.png"}
                      className="w-6 h-6 rounded-full object-cover"
                      alt="reply avatar"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-semibold">
                          {reply.user.username}
                        </p>
                        <span className="text-[10px] text-gray-400">
                          {formatDate(reply.date)}
                        </span>
                      </div>

                      {reply.isEditing ? (
                        <input
                          value={reply.text}
                          onChange={(e) =>
                            handleEditReplyChange(
                              comment.id,
                              reply.id,
                              e.target.value
                            )
                          }
                          className="text-sm w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-1 rounded"
                        />
                      ) : (
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {reply.text}
                        </p>
                      )}

                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <button
                          onClick={() => toggleReplyBox(comment.id, reply.id)}
                          className="hover:underline"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => toggleEditReply(comment.id, reply.id)}
                          className="hover:underline"
                        >
                          {reply.isEditing ? "Save" : "Edit"}
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteReply(comment.id, reply.id)
                          }
                          className="text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>

                      {reply.showReplyBox && (
                        <div className="mt-2 flex items-center space-x-2">
                          <input
                            type="text"
                            value={reply.replyInput || ""}
                            onChange={(e) =>
                              setComments((prev) =>
                                prev.map((c) =>
                                  c.id === comment.id
                                    ? {
                                        ...c,
                                        replies: c.replies.map((r) =>
                                          r.id === reply.id
                                            ? {
                                                ...r,
                                                replyInput: e.target.value,
                                              }
                                            : r
                                        ),
                                      }
                                    : c
                                )
                              )
                            }
                            placeholder="Reply..."
                            className="flex-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-1 rounded"
                          />
                          <button
                            onClick={() =>
                              handleReplyPost(
                                comment.id,
                                reply.replyInput,
                                reply.id
                              )
                            }
                            className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-600"
                          >
                            Post
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
