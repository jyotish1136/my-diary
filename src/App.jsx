import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import CreatePost from "./components/CreatePost";
import PostContainer from "./components/PostContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import UserProfile from "./components/UserProfile";
import ShowAlert from "./components/ShowAlert";
import EditUser from "./components/EditUser";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import UsernamePassword from "./components/UsernamePassword";
import CommentProvider from "./store/comment-provider";

function App() {
  const { userAuthenticated } = useAuth();

  return (
    <Router>
      <Header />
      <div className="pt-16 dark:bg-slate-950">
        <Routes>
          <Route
            path="/"
            element={
              userAuthenticated ? (
                <CommentProvider>
                  <PostContainer />
                </CommentProvider>
              ) : (
                <Home />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-credentials"
            element={
              <ProtectedRoute>
                <UsernamePassword />
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
