import { ProductStatus } from "@/utils/constants";
import axiosInstance from "../axiosConfigs";

const productsApi = {
  create: async (product) => {
    try {
      const res = await axiosInstance.post("/products", product);
      return {
        data: res,
        error: undefined,
      };
    } catch (error) {
      console.log("error create product", error);
      return {
        data: false,
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

  // detail
  createDetail: async ({
    id,
    author,
    pages,
    publisher,
    publicationDate,
    status = ProductStatus.IN_STOCK,
  }) => {
    try {
      await axiosInstance.post("/product-details", {
        id,
        author,
        pages,
        publisher,
        publicationDate,
        status,
      });
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

  updateDetail: async ({ id, pages, author, publisher, publicationDate }) => {
    try {
      await axiosInstance.patch(`/product-details/${id}`, {
        pages,
        author,
        publisher,
        publicationDate,
      });
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
};

export default productsApi;
