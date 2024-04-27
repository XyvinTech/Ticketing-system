import { create } from "zustand";
import { addProject, fetchProjects } from "../api/projectapi";

const useProjectStore = create((set) => ({
  projects: [],
  fetchProject:async()=>{
    const data=await fetchProjects();
    set({ projects: data.data });
  },
  addProject: async (projectData) => {
    const newProject = await addProject(projectData);
    set((state) => ({ projects: [...state.projects, newProject] }));
  },
 
 
}));
export { useProjectStore };
