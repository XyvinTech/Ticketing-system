
import { create } from "zustand";
import { addConversation, fetchConversationById } from "../api/conversationapi";

const useConversationStore = create((set) => ({
  conversations: [],
  addConversation: (conversationData) => addConversation(set, conversationData),
  conversation: null,
  fetchConversationById: (conversationId) => fetchConversationById(set, conversationId),
}));

export { useConversationStore };
