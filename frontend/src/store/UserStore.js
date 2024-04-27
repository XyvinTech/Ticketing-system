import { create } from "zustand";
import { addUser, fetchUsers,deleteUser } from "../api/userapi";

const useUserStore = create((set) => ({
    users: [],
    fetchUser:async()=>{
      const data=await fetchUsers();
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
