import { create } from "zustand";
import { addDepartment, fetchDepartment } from "../api/departmentapi";

const useDepartmentStore = create((set) => ({
    departments: [],
    fetchDepartment:async()=>{
      const data=await fetchDepartment();
      set({ departments: data.data });
    },
    addDepartment: async (depData) => {
      const newData = await addDepartment(depData);
      set((state) => ({ departments: [...state.departments, newData] }));
    },
   
}));

export { useDepartmentStore };
