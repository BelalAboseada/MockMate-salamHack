import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;






// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const { status, data } = error.response;
//       if (status === 401) {
//         toast.error("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         window.location.href = "/login"; // Redirect to login
//       } else {
//         toast.error(data.message || "An error occurred. Please try again.");
//       }
//     } else {
//       toast.error("Network error. Check your connection.");
//     }
//     return Promise.reject(error);
//   }
// );
