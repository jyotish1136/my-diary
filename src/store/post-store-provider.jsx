import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const PostListContext = createContext({
  postList: [],
  addPost: async () => {},
  deletePost: async () => {},
  updatePost: async () => {},
});

const PostListProvider = ({ children }) => {
  const { userAuthenticated } = useAuth();
  const [postList, setPostList] = useState([]);
  const { getToken } = useAuth();
  const loadPost = async () => {
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
  useEffect(() => {
    loadPost();
  }, []);
  const addPost = async (title, content) => {
    console.log("from context ", title, content);
    try {
      const token = getToken();
      const response = await axiosInstance.post(
        "/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const newPost = response.data;
        setPostList((prevPosts) => [...prevPosts, newPost]);
        loadPost();
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
    }
  };

  const updatePost = async (id, updatedTitle, updatedContent) => {
    try {
      const token = getToken();
      const response = await axiosInstance.put(
        `/notes/id/${id}`,
        { title: updatedTitle, content: updatedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPostList((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? { ...post, title: updatedTitle, content: updatedContent }
            : post
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, updatePost }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
export const usePost = () => useContext(PostListContext);
