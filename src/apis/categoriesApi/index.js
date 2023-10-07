import  axiosInstance from "../axiosConfigs";

const categoriesApi = {
  createCategory: async (category) => {
    try {
      await axiosInstance.post("/categories", category);
      return {
        success: true,
        error: undefined,
      };
    } catch (error) {
      console.log("error create category", error);
      return {
        success: false,
        error,
      };
    }
  },

  editCategory: async (id, category) => {
    try {
      await axiosInstance.patch(`/categories/${id}`, category);
      return {
        success: true,
        error: undefined,
      };
    } catch (error) {
      console.log("error edit category", error);
      return {
        success: false,
        error,
      };
    }
  },
};

export default categoriesApi;
