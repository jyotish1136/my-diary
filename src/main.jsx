import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import AuthProvider from "./context/AuthContext";
import UserProvider from "./store/user-provider.jsx";
import PostListProvider from "./store/post-store-provider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <PostListProvider>
            <App />
          </PostListProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
