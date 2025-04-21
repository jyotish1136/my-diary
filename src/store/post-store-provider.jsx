import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

export const PostListContext = createContext({
  postList: [],
  addPost: async () => {},
  deletePost: async () => {},
  updatePost: async () => {},
});

const PostListProvider = ({ children }) => {
  const [postList, setPostList] = useState([]);
  const { getToken, userAuthenticated } = useAuth();
  const loadPost = async () => {
    if (!userAuthenticated) {
      console.log("User not authenticated, skipping post load.");
      return;
    }
    try {
      const token = getToken();
      if (!token) {
        console.warn("No token found.");
        return;
      }

      const response = await axiosInstance.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setPostList(response.data);
      } else {
        console.warn("Unexpected response status:", response.status);
        setPostList([]);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setPostList([]);
    }
  };

  useEffect(() => {
    loadPost();
  }, [userAuthenticated]);
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

  return (
    <PostListContext.Provider
      value={{
        postList,
        addPost,
        deletePost,
        updatePost,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
export const usePost = () => useContext(PostListContext);
