import axiosInstance from "./axiosintercepter";
export const uploadImage = async (files) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    let formData = new FormData();
    let totalFileSize = 0;

    // Calculate total file size
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append(`attachments`, file);
        totalFileSize += file.size;
      });
    } else {
      formData.append("attachments", files);
      totalFileSize += files.size;
    }

    // Check if total file size exceeds 30 MB
    if (totalFileSize > 30 * 1024 * 1024) {
      
      return ("error"); 
    }

    const response = await axiosInstance.post("/upload", formData, config);
  
    return response.data;
  } catch (error) {
    throw error;
   
  }
};
