import axiosInstance from "../axiosConfigs";

const assetsApi = {
  uploadImage: async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axiosInstance.post("/assets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      image: response.newAsset,
    };
  },
};

export default assetsApi;
