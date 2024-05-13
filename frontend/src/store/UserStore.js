import { create } from "zustand";
import { addUser, fetchUsers,deleteUser, updateAdminUser, getUserByProjectId } from "../api/userapi";
import { toast } from "react-toastify";

const useUserStore = create((set) => ({
    users: [],
    fetchUser:async(filter)=>{
      const data=await fetchUsers(filter);
      set({ users: data?.data });
    },
    getUserByProject:async(filter)=>{
      const data=await getUserByProjectId(filter);
      set({ users: data?.data });
    },
    addUser: async (userData) => {
      const newUser = await addUser(userData);
      set((state) => ({ users: [...state.users, newUser] }));
      toast.success(newUser.message);
    },
    deleteUser:async(userId)=>{
        await deleteUser(userId);
    },
    updateUser:async(userId,data)=>{
      const newData=await updateAdminUser (userId,data);
      set({ users: newData });
    }
}));

export { useUserStore };
