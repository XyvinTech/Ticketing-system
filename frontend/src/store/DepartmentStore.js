import { create } from "zustand";
import { addDepartment, deleteDepartment, editDepartment, fetchDepartment } from "../api/departmentapi";
import { toast } from "react-toastify";

const useDepartmentStore = create((set) => ({
    departments: [],
    fetchDepartment:async()=>{
      const data=await fetchDepartment();
      set({ departments: data.data });
    },
    addDepartment: async (depData) => {
      const newData = await addDepartment(depData);
      set((state) => ({ departments: [...state.departments, newData] }));
      toast.success(newData.message);
    },
    editDepartment: async (departmentId, updateData) => {
      const updatedep = editDepartment(departmentId, updateData);
      set({departments:updatedep}); 
    },
    deleteDepartment:async(departmentId)=>{
      await deleteDepartment(departmentId);
  }
   
}));

export { useDepartmentStore };
