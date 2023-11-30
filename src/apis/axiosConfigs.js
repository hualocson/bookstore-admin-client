import axios from "axios";
import env from "@/utils/vars";

const axiosInstance = axios.create({
  baseURL: env.BASE_URL,
  withCredentials: true,
});
// Response interceptor to handle successful responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response contains a 'success' property
    if (response.data && response.data.success) {
      // Return only the data if the response is successful
      return response.data.data;
    } else {
      // If 'success' is false, reject the response
      return Promise.reject(response);
    }
  },
  (error) => {
    // Handle errors here (e.g., network issues)
    return Promise.reject(error);
  }
);

export default axiosInstance;
