import axiosInstance from "./axiosintercepter";

export const addDepartment = async (depData) => {
    try {
      const response = await axiosInstance.post("/department/create", depData);
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const fetchDepartment = async () => {
    try {
      const response = await axiosInstance.get("/department/get");
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const updateDepartment = async (departmentId, updateData) => {
    try {
      const response = await axiosInstance.put(`/department/edit/${departmentId}`, updateData);
      console.log(response.data)
      return response.data;
     
    } catch (error) {
      console.error('Error caught:', error);
    }
  };