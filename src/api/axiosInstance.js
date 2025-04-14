import axios from "axios";
const API_BASE_URL = "https://my-notes-backend-qfpu.onrender.com";
const axiosInstance = axios.create({ baseURL: API_BASE_URL })
export default axiosInstance;