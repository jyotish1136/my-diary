import { useLocation, useNavigate } from "react-router-dom";

const ShowAlert = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "";
  const type = location.state?.type || "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {message && (
        <div
          className={`px-6 py-3 rounded-lg ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <button
        className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
};
export default ShowAlert;
