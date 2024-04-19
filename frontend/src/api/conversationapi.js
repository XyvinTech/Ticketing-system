import axiosInstance from "./axiosintercepter";
import asyncHandler from "../utils/asyncHandler";
export const addConversation = asyncHandler(async (set, conversationData) => {
    const response = await axiosInstance.post("/conversation/add", conversationData);
    const newConversation = response.data;
    set((state) => ({ conversation: [...state.conversation, newConversation] }));
  });
  
  export const fetchConversationById = asyncHandler(async (set, conversationId) => {
    set({ conversations: [] });
    const response = await axiosInstance.get(`/conversation/fetch/${conversationId}`);
    set({ conversations: response.data });
  });