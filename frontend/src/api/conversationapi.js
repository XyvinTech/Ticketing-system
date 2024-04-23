import axiosInstance from "./axiosintercepter";
import asyncHandler from "../utils/asyncHandler";



export const addConversation = async ( conversationData) => {
    const response = await axiosInstance.post("/conversation/add", conversationData);
    return response.data.data;
    
  };
  
  export const fetchConversationById = async ( conversationId) => {
    
    const response = await axiosInstance.get(`/conversation/fetch/${conversationId}`);
        return response.data.data;
  };