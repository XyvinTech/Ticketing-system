
import axiosInstance from "./axiosintercepter";

export const addConversation = async (conversationData) => {
  try {
    const response = await axiosInstance.post("/conversation/add", conversationData);
    return response.data; 
  } catch (error) {
    console.error('Error caught:', error);
  }
};

export const fetchConversationById = async (conversationId) => {
  try {
    const response = await axiosInstance.get(`/conversation/fetch/${conversationId}`);
  //  console.log("res",response.data)
    return response.data; 
  } catch (error) {
    console.error('Error caught:', error);
  }
};
