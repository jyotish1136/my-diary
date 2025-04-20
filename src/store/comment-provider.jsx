import { createContext, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

const CommentContext = createContext({
  manageLike: async () => {},
  addComment: async () => {},
  deleteComment: async () => {},
  loadComment: async () => {},
});

const CommentProvider = ({ children }) => {
  const { getToken, userAuthenticated } = useAuth();
  const manageLike = async (userId, postId) => {
    try {
      const token = getToken();
      const response = await axiosInstance.post(
        "/likes",
        { userId: userId, postId: postId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("Like update failed:", error);
      return null;
    }
  };
  const deleteComment = async (postId, commentId) => {
    try {
      const token = getToken();
      const response = await axiosInstance.delete("/comments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { postId, commentId },
      });

      return response;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return null;
    }
  };

  const loadComment = async (postId) => {
    try {
      const token = getToken();
      const response = await axiosInstance.get(`/comments/id/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.error("Error loading comments:", error);
      return null;
    }
  };

  const addComment = async (userId, postId, comment) => {
    try {
      const token = getToken();
      const response = await axiosInstance.post(
        "/comments",
        { userId, postId, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      console.error("Error adding comment:", error);
      return null;
    }
  };
  return (
    <CommentContext.Provider
      value={{
        manageLike,
        addComment,
        deleteComment,
        loadComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
export default CommentProvider;
export const useLikeComment = () => useContext(CommentContext);
