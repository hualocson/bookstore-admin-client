import axiosInstance from "../axiosConfigs";

const productsApi = {
  create: async (product) => {
    try {
      await axiosInstance.post("/products", product);
      return {
        success: true,
        error: undefined,
      };
    } catch (error) {
      console.log("error create product", error);
      return {
        success: false,
        error,
      };
    }
  },
  update: async (product) => {
    try {
      await axiosInstance.patch(`/products/${parseInt(product.id)}`, product);
      return {
        success: true,
        error: undefined,
      };
    } catch (error) {
      console.log("error update product", error);
      return {
        success: false,
        error,
      };
    }
  },
  delete: async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      return {
        success: true,
        error: undefined,
      };
    } catch (error) {
      console.log("error delete product", error);
      return {
        success: false,
        error,
      };
    }
  },

  restore: async (id) => {
    try {
      await axiosInstance.patch(`/products/${id}/restore`);
      return {
        success: true,
        error: undefined,
      };
    } catch (error) {
      console.log("error restore product", error);
      return {
        success: false,
        error,
      };
    }
  },
};

export default productsApi;
