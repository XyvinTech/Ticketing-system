import axiosInstance from "./axiosintercepter";

export const addDepartment = async (depData) => {
    try {
      const response = await axiosInstance.post("/department/create", depData);
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const fetchDepartment = async (filter) => {
    try {
      const response = await axiosInstance.get("/department/get",{params:filter});
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const updateDepartment = async (departmentId, updateData,filter={}) => {
    try {
      const response = await axiosInstance.put(`/department/edit/${departmentId}`, updateData,{params:filter});
      // console.log(response.data)
      return response.data;
     
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const deleteDepartment = async (departmentId) => {
    try {
      const response = await axiosInstance.delete(`/department/delete/${departmentId}`);
      return response.data;
    } catch (error) {
      console.error("Error caught:", error);
    }
  };
  export const editDepartment = async (departmentId,updateData) => {
    try {
      const response = await axiosInstance.put(`/department/update/${departmentId}`,updateData);
      return response.data;
    } catch (error) {
      console.error("Error caught:", error);
    }
  };