import { create } from "zustand";
import { getAdmin, getAdminById,updateAdmin } from "../api/adminapi";

const useAdminStore = create((set) => ({
  admin: null,
  isChange:false,
  updateChange:(isChange)=>{
    set({isChange:!isChange})
  },
  getAdmin: async (adminData) => {
    const data = await getAdmin(adminData);
    set({ admin: data }); 
    localStorage.setItem("token", data.token);
  },
  fetchAdmin:async()=>{
    const fetch = await getAdminById();
    set({ admin: fetch.data });
  },
  updateAdmin:async(data)=>{
    const updatedAdmin=await updateAdmin(data);
    set({ admin: updatedAdmin });
  }
  
}));

export { useAdminStore };
