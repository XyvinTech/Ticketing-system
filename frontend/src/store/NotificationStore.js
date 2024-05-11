import { create } from "zustand";
import { fetchNotification, updateNotification } from "../api/notificationapi";

const useNotificationStore = create((set) => ({
  notification: [],
  change:false,
  updateChange:(change)=>{
    set({change:!change})
  },
  fetchNotification: async () => {
    const fetched = await fetchNotification();
    set({ notification: fetched.data});
  },
  updateNotification:async()=>{
    const updated=await updateNotification();
    set({ notification: updated });
  }
}));

export { useNotificationStore };