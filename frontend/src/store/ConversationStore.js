
import { create } from "zustand";
import { addConversation, fetchConversationById } from "../api/conversationapi";

const useConversationStore = create((set) => ({
  conversations: [],
  addConversation: async (conversationData) => {
    let newConversation = await addConversation(conversationData)
    set((state) => ({ conversations: [...state.conversations, newConversation] }));
  },
  conversation: null,
  fetchConversationById: async (conversationId) => {

    let conversationById = await fetchConversationById(conversationId)
    set({ conversation:conversationById })
  }
}));

export { useConversationStore };
