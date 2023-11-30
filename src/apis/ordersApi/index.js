import axiosInstance from "../axiosConfigs";

const ordersApi = {
  updateStatus: async (orderId, status) => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}/status`, {
        status: parseInt(status),
      });
      return {
        error: null,
        data: response,
      };
    } catch (error) {
      return {
        error,
        data: null,
      };
    }
  },
};

export default ordersApi;
