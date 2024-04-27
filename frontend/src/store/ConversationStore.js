import { create } from "zustand";
import { addConversation, fetchConversationById } from "../api/conversationapi";

const useConversationStore = create((set) => ({
  conversations: [],
  fetchConversationById: async (conversationId) => {
    // set({ conversation: [] });
    const fetchedConversation = await fetchConversationById(conversationId);
    set({ conversations: fetchedConversation });
  },
  addConversation: async (conversationData) => {
    const newConversation = await addConversation(conversationData);
    set((state) => ({
      conversations: [...state.conversations, newConversation],
    }));
  },
}));

export { useConversationStore };
