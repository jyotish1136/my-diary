import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

export const PostListContext = createContext({
  postList: [],
  addPost: async () => {},
  deletePost: async () => {},
  updatePost: async () => {},
  manageLike: async () => {},
  addComment: async () => {},
  deleteComment: async () => {},
});

const PostListProvider = ({ children }) => {
  const [postList, setPostList] = useState([]);
  const { getToken, userAuthenticated } = useAuth();
  const loadPost = async () => {
    if (!userAuthenticated) return;
    try {
      const token = getToken();
      const response = await axiosInstance.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPostList(response.data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };
  const loadPublicPost = async () => {
    if (!userAuthenticated) return;
    try {
      const token = getToken();
      const response = await axiosInstance.get("/auth/all-public-notes");
      setPostList(response.data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };
  useEffect(() => {
    loadPost();
    loadPublicPost();
  }, []);
  const addPost = async (title, content, privacy, hashtags) => {
    try {
      const token = getToken();
      const response = await axiosInstance.post(
        "/notes",
        { title, content, privacy, hashtags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        const newPost = response.data;
        setPostList((prevPosts) => [...prevPosts, newPost]);
        return response;
      }
    } catch (error) {
      console.error("Error occurred during posting:", error);
      return null;
    }
  };
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

  const deletePost = async (id) => {
    try {
      const token = getToken();
      const res = await axiosInstance.delete(`/notes/id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      return null;
    }
  };

  const updatePost = async (
    id,
    updatedTitle,
    updatedContent,
    privacy,
    hashtags
  ) => {
    try {
      const token = getToken();
      const response = await axiosInstance.put(
        `/notes/id/${id}`,
        {
          title: updatedTitle,
          content: updatedContent,
          privacy: privacy,
          hashtags: hashtags,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPostList((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                title: updatedTitle,
                content: updatedContent,
                privacy: privacy,
                hashtags: hashtags,
              }
            : post
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
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

  const deleteComment = async (comment) => {
    try {
      const token = getToken();
      const response = await axiosInstance.delete("/comments", {
        headers: { Authorization: `Bearer ${token}` },
        data: comment,
      });
      return response;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return null;
    }
  };

  return (
    <PostListContext.Provider
      value={{
        postList,
        addPost,
        deletePost,
        updatePost,
        manageLike,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
export const usePost = () => useContext(PostListContext);
