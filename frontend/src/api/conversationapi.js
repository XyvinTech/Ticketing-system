import axiosInstance from "./axiosintercepter";
import asyncHandler from "../utils/asyncHandler";



export const addConversation = asyncHandler(async ( conversationData) => {
    const response = await axiosInstance.post("/conversation/add", conversationData);
    return response.data;
    
  });
  
  export const fetchConversationById = asyncHandler(async ( conversationId) => {
    
    const response = await axiosInstance.get(`/conversation/fetch/${conversationId}`);
    return response.data;
  });