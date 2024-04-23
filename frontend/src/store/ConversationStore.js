
import { create } from "zustand";
import { addConversation, fetchConversationById } from "../api/conversationapi";

const useConversationStore = create((set) => ({
  conversations: [],
  addConversation: async (conversationData) => {
      const newConversation = await addConversation(conversationData);
      set((state) => ({ conversations: [...state.conversations, newConversation] }));
   
  },
  conversation:[],
  fetchConversationById: async (conversationId) => {
   
      set({ conversation: [] });
      const fetchedConversation = await fetchConversationById(conversationId);
      set({ conversation: fetchedConversation });
    
  },
}));

export { useConversationStore };
