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
import UserExists from "./components/UserExists";
import ShowAlert from "./components/ShowAlert";
import EditUser from "./components/EditUser";
import UserDetailsForm from "./account-creation/UserDetailsForm";
import Footer from "./components/Footer";

function App() {
  const { userAuthenticated } = useAuth();
  return (
    <PostListProvider>
      <Router>
        <Header />
        <div className="pt-16 dark:bg-slate-950">
          <Routes>
            <Route
              path="*"
              element={!userAuthenticated ? <Home /> : <PostContainer />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user-exists" element={<UserExists />} />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts"
              element={
                <ProtectedRoute>
                  <PostContainer />
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
            <Route path="/user-details" element={<UserDetailsForm />} />
            <Route path="/show-alert" element={<ShowAlert />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </PostListProvider>
  );
}

export default App;
