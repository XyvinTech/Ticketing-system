import axiosInstance from "./axiosintercepter";

export const uploadImage = async (file) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const data = { attachments: file };
    const response = await axiosInstance.post("/upload", data, config);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
