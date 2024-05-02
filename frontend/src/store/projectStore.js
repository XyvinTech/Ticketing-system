import { create } from "zustand";
import { addProject, deleteProject, fetchProjectById, fetchProjects, updateProject } from "../api/projectapi";
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
  updateProject:async(projectId,updateData)=>{
    const data=await updateProject(projectId,updateData);
    set({ projects: data });
  },
  deleteProject:async(projectId)=>{
    await deleteProject(projectId);
}
 
}));
export { useProjectStore };
