import { create } from "zustand";
import {  getLogin, getLoginById, updateUser } from "../api/userapi";


const useAdminStore = create((set) => ({
    user: [],
    isChange:false,
    updateChange:(isChange)=>{
      set({isChange:!isChange})
    },
    getLogin: async (datas) => {
      const data = await getLogin(datas);
    
      set({ user: data }); 
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", data.userType);
    },
    fetchLogin:async()=>{
      const fetch = await getLoginById();
      set({ user: fetch?.data });
    },
    updateUser:async(data)=>{
      const updatedUser=await updateUser(data);
      set({ user: updatedUser });
    }
}));

export { useAdminStore };
