import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import CreatePost from "./components/CreatePost";
import Signup from "./account-creation/Signup";
import PostContainer from "./components/PostContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import PostListProvider from "./store/post-store-provider";
import { useAuth } from "./context/AuthContext";
import UserProfile from "./components/UserProfile";
import ShowAlert from "./components/ShowAlert";
import EditUser from "./components/EditUser";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import UserProvider from "./store/user-provider";
import UsernamePassword from "./components/UsernamePassword";

function App() {
  const { userAuthenticated } = useAuth();
  return (
    <Router>
      <Header />
      <div className="pt-16 dark:bg-slate-950">
        <Routes>
          <Route
            path="/home"
            element={
              !userAuthenticated ? (
                <Home />
              ) : (
                <PostListProvider>
                  <PostContainer />
                </PostListProvider>
              )
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <PostListProvider>
                  <CreatePost />
                </PostListProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <PostListProvider>
                  <PostContainer />
                </PostListProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProvider>
                  <PostListProvider>
                    <UserProfile />
                  </PostListProvider>
                </UserProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <UserProvider>
                  <EditUser />
                </UserProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-credentials"
            element={
              <ProtectedRoute>
                <UserProvider>
                  <UsernamePassword />
                </UserProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/show-alert" element={<ShowAlert />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
