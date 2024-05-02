import axiosInstance from "./axiosintercepter";
export const fetchNotification = async () => {
    try {
      const response = await axiosInstance.get("/notification/get");
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };