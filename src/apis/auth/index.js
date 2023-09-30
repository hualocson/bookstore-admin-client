import axiosInstance from "../axiosConfigs";

const authApi = {
  login: async ({ username, password }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      return {
        error: undefined,
        user: response.payload,
      };
    } catch (error) {
      return {
        error,
      };
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      return {
        error: undefined,
      };
    } catch (error) {
      return {
        error,
      };
    }
  },
};

export default authApi;
