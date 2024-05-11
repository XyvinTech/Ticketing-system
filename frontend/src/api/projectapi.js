import axiosInstance from "./axiosintercepter";

export const addProject = async (projectData) => {
    try {
      const response = await axiosInstance.post("/project/add", projectData);
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const fetchProjects = async (filter) => {
    try {
      const response = await axiosInstance.get("/project/get",{params:filter});
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const fetchProjectById = async (filter) => {
    try {
      const response = await axiosInstance.get("/project/fetchId",{params:filter});
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const updateProject = async (projectId,data) => {
    try {
      const response = await axiosInstance.put(`/project/update/${projectId}`,data);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error caught:", error);
    }
  };
  export const deleteProject = async (projectId) => {
    try {
      const response = await axiosInstance.delete(`/project/delete/${projectId}`);
      return response.data;
    } catch (error) {
      console.error("Error caught:", error);
    }
  };
  
