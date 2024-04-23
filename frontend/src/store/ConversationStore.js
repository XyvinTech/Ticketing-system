
import { create } from "zustand";
import { addConversation, fetchConversationById } from "../api/conversationapi";

const useConversationStore = create((set) => ({
  conversations: [],

  fetchConversationById: async (conversationId) => {
    let fetchedConversation = await fetchConversationById(conversationId)
    console.log(fetchedConversation);
    set((state) => ({ conversations: [...state.conversations, fetchedConversation] }));
  },
  addConversation: async (conversationData) => {
    let newConversation = await addConversation(conversationData)
    console.log(newConversation);

    set((state) => ({ conversations: [...state.conversations, newConversation] }));
  },

}));

export { useConversationStore };
