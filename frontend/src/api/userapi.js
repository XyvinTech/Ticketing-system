import axiosInstance from "./axiosintercepter";

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
    const response = await axiosInstance.get("/admin/get-user", { params: filter });
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
