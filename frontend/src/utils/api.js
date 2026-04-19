// import axios from "axios";

// // Use environment variable with fallback
// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:9999";

// let accessToken = null;

// const api = axios.create({
//   baseURL: `${API_BASE}/api`,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const setAccessToken = (token) => {
//   accessToken = token;
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// };

// export const getAccessToken = () => {
//   return accessToken;
// };

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken") || accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for token refresh
// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Try to refresh token (implement your refresh endpoint)
//         const res = await axios.post(
//           `${API_BASE}/api/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const newToken = res.data.token;
//         setAccessToken(newToken);
//         localStorage.setItem("authToken", newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (err) {
//         localStorage.clear();
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



// utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:9999",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;