import { create } from "zustand";
import { addDepartment, deleteDepartment, fetchDepartment, updateDepartment } from "../api/departmentapi";
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
    updateDepartment: async (departmentId, updateData,filter) => {
      const updatedep = updateDepartment(departmentId, updateData,filter);
      set((state) => ({
        departments: state.departments.map((dep) =>
          dep._id === departmentId ? { ...dep, ...updatedep } : dep
        ),
      })); 
    },
    deleteDepartment:async(departmentId)=>{
      await deleteDepartment(departmentId);
  }
   
}));

export { useDepartmentStore };
