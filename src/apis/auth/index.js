import axiosInstance from "../axiosConfigs";
import env from "@/utils/vars";

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
        token: response.token,
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

  getAdminDataSSR: async (ctx) => {
    try {
      const response = await fetch(`${env.SSR_BASE_URL}/auth`, {
        method: "GET",
        credentials: "include",
        headers: {
          cookie: ctx.req.headers.cookie,
        },
      });

      const data = await response.json();
      if (data?.error) {
        return {
          error: data.error,
          payload: null,
        };
      }
      return {
        error: null,
        payload: data.data.payload,
      };
    } catch (error) {
      return {
        error,
        payload: null,
      };
    }
  },
};

export default authApi;
