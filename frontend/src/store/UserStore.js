import { create } from "zustand";
import { addUser, fetchUsers,deleteUser } from "../api/userapi";

const useUserStore = create((set) => ({
    users: [],
    fetchUser:async(filter)=>{
      const data=await fetchUsers(filter);
      set({ users: data.data });
    },
    addUser: async (userData) => {
      const newUser = await addUser(userData);
      set((state) => ({ users: [...state.users, newUser] }));
    },
    deleteUser:async(userId)=>{
        await deleteUser(userId);
    }
}));

export { useUserStore };
