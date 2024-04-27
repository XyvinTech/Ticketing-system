import axiosInstance from "./axiosintercepter";

export const uploadImage = async (files) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    let formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append(`attachments`, file);
      });
    } else {
      formData.append("attachments", files);
    }
    const response = await axiosInstance.post("/upload",formData, config);
    console.log("respo",response)
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
