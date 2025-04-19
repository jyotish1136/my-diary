// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

// const Signup = () => {
//   const { signupWithGoogle } = useAuth();
//   return (
//     <div className="flex justify-center items-center min-h-screen dark:bg-gray-950 dark:text-white px-4">
//       <div className="dark:bg-gray-900  dark:text-white bg-slate-300 p-6 rounded-lg shadow-lg w-full max-w-md ">
//         <h3 className="text-2xl font-bold text-center mb-5">Sign Up</h3>
//         <div className="mt-4">
//           <button
//             onClick={signupWithGoogle}
//             className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
//           >
//             <FaGoogle className="mr-2" /> Sign Up with Google
//           </button>
//         </div>
//         <p className="text-center text-sm mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
