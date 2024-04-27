import axiosInstance from "./axiosintercepter";

export const addProject = async (projectData) => {
    try {
      const response = await axiosInstance.post("/project/add", projectData);
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  export const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/project/get");
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
