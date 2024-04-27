import axios from "axios";
import axiosInstance from "./axiosintercepter";

export const getAdmin = async (adminData) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/login", adminData);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const getAdminById = async () => {
  try {
    const response = await axiosInstance.get("/admin/get");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const updateAdmin = async (data) => {
  try {
    const response = await axiosInstance.put("/admin/update", data);
    console.log("up", response.data);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};

export const updatePassword = async (data) => {
  try {
    const response = await axiosInstance.put("/admin/update-password", data);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
