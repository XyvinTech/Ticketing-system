import { create } from "zustand";
import { addUser, fetchUsers,deleteUser } from "../api/userapi";
import { toast } from "react-toastify";

const useUserStore = create((set) => ({
    users: [],
    fetchUser:async(filter)=>{
      const data=await fetchUsers(filter);
      set({ users: data.data });
    },
    addUser: async (userData) => {
      const newUser = await addUser(userData);
      set((state) => ({ users: [...state.users, newUser] }));
      toast.success(newUser.message);
    },
    deleteUser:async(userId)=>{
        await deleteUser(userId);
    }
}));

export { useUserStore };
