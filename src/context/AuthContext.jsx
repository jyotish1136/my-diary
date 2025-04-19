import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext({
  userAuthenticated: false,
  setUserAuthenticated: () => {},
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  getToken: () => {},
  signupWithGoogle: () => {},
  loginWithGoogle: () => {},
});

const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [userAuthenticated, setUserAuthenticated] = useState(!!jwtToken);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token && localStorage.getItem("jwtToken") !== token) {
      setJwtToken(token);
      localStorage.setItem("jwtToken", token);
    }
  }, []);
  useEffect(() => {
    setUserAuthenticated(!!jwtToken);
  }, [jwtToken]);
  const CLIENT_ID =
    "261203815672-ntjjuqctbbgq9i5d5833du9vlrgtlvpv.apps.googleusercontent.com";
  const REDIRECT_URI = "http://localhost:8080/oauth2/google";
  const STATE = "random_string";
  const SCOPE = "profile email";

  const signupWithGoogle = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPE}&state=${STATE}&redirect_uri=${REDIRECT_URI}&prompt=select_account`;
    window.location.href = googleAuthUrl;
  };

  const signup = async (firstname, lastname, email, username, password) => {
    const response = await axiosInstance.post("/auth/signup", {
      firstname,
      lastname,
      email,
      username,
      password,
    });
    if (response.status == 200) {
      return response;
    }
  };

  const login = async (username, password) => {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    if (response.status === 200) {
      const token = response.data;
      localStorage.setItem("jwtToken", token);
      setJwtToken(token);
      return response;
    }
  };

  const getToken = () => {
    return jwtToken;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setJwtToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated,
        setUserAuthenticated,
        login,
        logout,
        signup,
        getToken,
        signupWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
