import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ;
// // work on local host 3004
// const API_BASE_URL = "http://localhost:3004";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  console.log("access token: ", token);

  if (token) {
    config.headers.authorization = `user ${token}`;
    console.log(config.headers);
    console.log("Authorization Header:", config.headers.authorization);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        return Promise.reject({
          status,
          message: data.message || "Bad request. Please check your input.",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
