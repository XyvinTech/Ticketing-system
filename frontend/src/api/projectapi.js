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
  export const fetchProjectById = async () => {
    try {
      const response = await axiosInstance.get("/project/fetchId");
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
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
  
