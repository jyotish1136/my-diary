import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ShowAlert = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const message = location.state?.message ?? "";
  const type = location.state?.type ?? "error";

  useEffect(() => {
    if (!message) {
      navigate("/login");
    } else {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => {
        clearTimeout(timer);
        logout();
      };
    }
  }, [message, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {message && (
        <div
          className={`px-6 py-3 rounded-lg text-lg font-semibold ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <button
        className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        onClick={() => {
          navigate("/login");
          logout();
        }}
      >
        Go to Login Now
      </button>
    </div>
  );
};

export default ShowAlert;
