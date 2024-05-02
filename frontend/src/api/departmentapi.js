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
  export const removeMember = async (departmentId,memberId) => {
    try {
      const response = await axiosInstance.put(`/department/removeMember/${departmentId}`,memberId);
      return response.data;
    } catch (error) {
      console.error("Error caught:", error);
    }
  };