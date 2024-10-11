import axios from "axios";
import { refreshTokenApi } from "@/api/auth";

let accToken: string | null = null;
export const setToken = (newToken: string) => (accToken = newToken);
export const getToken = () => accToken;
export const publicAxios = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true,
});
export const privateAxios = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true,
});
privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Step 3: Add a Response Interceptor to handle token refresh
privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Avoid infinite loop
      // Step 4: Request a new token with the refresh token
      try {
        const res = await refreshTokenApi();
        const newToken = res.data.token;
        // Store the new token
        setToken(newToken);
        // Update the Authorization header and retry the original request
        originalRequest.headers["Authorization"] = newToken;
        return privateAxios(originalRequest);
      } catch (refreshError) {
        // Optionally handle failure to refresh the token, e.g., logout the user
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
