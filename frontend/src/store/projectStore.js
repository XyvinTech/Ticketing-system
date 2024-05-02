import { create } from "zustand";
import { addProject, deleteProject, fetchProjectById, fetchProjects } from "../api/projectapi";
import { toast } from "react-toastify";

const useProjectStore = create((set) => ({
  projects: [],
  fetchProject:async(filter)=>{
    const data=await fetchProjects(filter);
    set({ projects: data.data });
  },
  fetchProjectById:async()=>{
    const data=await fetchProjectById();
    set({ projects: data.data });
  },
  addProject: async (projectData) => {
    const newProject = await addProject(projectData);
    set((state) => ({ projects: [...state.projects, newProject] }));
    toast.success(newProject.message);
  },
  deleteProject:async(projectId)=>{
    await deleteProject(projectId);
}
 
}));
export { useProjectStore };
