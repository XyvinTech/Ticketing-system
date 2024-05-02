import { create } from "zustand";
import { fetchNotification } from "../api/notificationapi";

const useNotificationStore = create((set) => ({
  notification: [],
  fetchNotification: async () => {
    const fetched = await fetchNotification();
    set({ notification: fetched.data});
  }
}));

export { useNotificationStore };