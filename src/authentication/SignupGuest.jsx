// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";
// import { useUser } from "../store/user-provider";
// import { useNavigate } from "react-router-dom";

// const SignupGuest = () => {
//   const { signup } = useAuth();
//   const [usernameError, setUsernameError] = useState("");
//   const [usernameSuccess, setUsernameSuccess] = useState("");
//   const [username, setUsername] = useState("");
//   const { validateUser } = useUser();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.firstname.trim())
//       newErrors.firstname = "First name is required";
//     if (!emailRegex.test(formData.email))
//       newErrors.email = "Enter a valid email";
//     if (formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       const response = await signup(
//         formData.firstname,
//         formData.lastname,
//         formData.email,
//         username,
//         formData.password
//       );
//       if (response.status == 200) {
//         navigate("/show-alert", {
//           state: {
//             message: "Account created successfully! Please login",
//             type: "success",
//           },
//         });
//       } else {
//         navigate("/show-alert", {
//           state: {
//             message: "Error in profile creation! Please try again",
//             type: "failure",
//           },
//         });
//       }
//     }
//   };

//   const handleUsernameValidation = async () => {
//     setUsernameError("");
//     setUsernameSuccess("");

//     if (username.length < 4) {
//       setUsernameError("Username must be at least 4 characters.");
//       return;
//     }

//     if (!/^[a-z0-9._]+$/.test(username)) {
//       setUsernameError(
//         "Only lowercase letters, numbers, '.', and '_' are allowed."
//       );
//       return;
//     }

//     if (username) {
//       try {
//         const response = await validateUser(username);
//         if (response.status === 200 && response.data.exists) {
//           setUsernameError("Username is already taken.");
//         } else {
//           setUsernameSuccess("Username is available!");
//         }
//       } catch (error) {
//         setUsernameError("Error checking username.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md space-y-5"
//       >
//         <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
//           Create Account
//         </h2>

//         {/* First Name */}
//         <div>
//           <label className="block mb-1 text-sm font-medium dark:text-gray-200">
//             First Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="firstname"
//             value={formData.firstname}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
//             placeholder="John"
//           />
//           {errors.firstname && (
//             <p className="text-sm text-red-500 mt-1">{errors.firstname}</p>
//           )}
//         </div>

//         {/* Last Name */}
//         <div>
//           <label className="block mb-1 text-sm font-medium dark:text-gray-200">
//             Last Name
//           </label>
//           <input
//             type="text"
//             name="lastname"
//             value={formData.lastname}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
//             placeholder="Doe"
//           />
//         </div>
//         {/* Email */}
//         <div>
//           <label className="block mb-1 text-sm font-medium dark:text-gray-200">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white"
//             placeholder="john@example.com"
//           />
//           {errors.email && (
//             <p className="text-sm text-red-500 mt-1">{errors.email}</p>
//           )}
//         </div>
//         {/* Username */}
//         <div className="relative w-full mb-4">
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => {
//               setUsername(e.target.value);
//               setUsernameError("");
//               setUsernameSuccess("");
//             }}
//             onBlur={handleUsernameValidation}
//             className={`w-full px-4 py-2 border rounded-md ${
//               usernameError ? "border-red-500" : "border-gray-300"
//             } dark:bg-gray-700 dark:text-white`}
//           />
//           {usernameError && (
//             <p className="text-red-500 text-sm mt-1">{usernameError}</p>
//           )}
//           {usernameSuccess && (
//             <p className="text-green-500 text-sm mt-1">{usernameSuccess}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block mb-1 text-sm font-medium dark:text-gray-200">
//             Password <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:text-white pr-10"
//               placeholder="••••••••"
//             />
//             <span
//               className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           {errors.password && (
//             <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//           )}
//         </div>

//         {/* Signup Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupGuest;
