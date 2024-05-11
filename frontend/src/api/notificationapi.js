import axiosInstance from "./axiosintercepter";
export const fetchNotification = async () => {
  try {
    const response = await axiosInstance.get("/notification/get");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const updateNotification = async () => {
  try {
    const response = await axiosInstance.put("/notification/markAllRead");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
