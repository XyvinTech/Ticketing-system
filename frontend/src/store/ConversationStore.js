import { create } from "zustand";
import { addConversation, fetchConversationById } from "../api/conversationapi";
import { toast } from "react-toastify";

const useConversationStore = create((set) => ({
  conversations: [],
  fetchConversationById: async (conversationId) => {
    const fetchedConversation = await fetchConversationById(conversationId);
    set({ conversations: fetchedConversation?.data});
  },
  addConversation: async (conversationData) => {
    const newConversation = await addConversation(conversationData);
    toast.success(newConversation.message);
  },
}));

export { useConversationStore };
