import axios from "axios";
import axiosInstance from "./axiosintercepter";
export const getLogin = async (datas) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/login",
      datas
    );
    console.log("data",response.data)
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const getLoginById = async () => {
  try {
    const response = await axiosInstance.get("/user/get");
    // console.log("resp",response.data.data)
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const addUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/admin/add-user", userData);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const fetchUsers = async (filter) => {
  try {
    const response = await axiosInstance.get("/admin/get-user", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/admin/delete-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const updateUser = async (data) => {
  try {
    const response = await axiosInstance.put("/user/update", data);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};

export const updatePassword = async (data) => {
  try {
    const response = await axiosInstance.put("/user/passwordupdate", data);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
