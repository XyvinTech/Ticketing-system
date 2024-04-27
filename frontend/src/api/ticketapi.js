import axiosInstance from "./axiosintercepter";

export const fetchTickets = async () => {
  try {
    const response = await axiosInstance.get("/ticket/get");
    return response.data; 
  } catch (error) {
    console.error('Error caught:', error);
  }
};
  
  export const fetchTicketById = async (ticketId) => {
    try {
    const response = await axiosInstance.get(`/ticket/get/${ticketId}`);
   
    return response.data; 
  } catch (error) {
    console.error('Error caught:', error);
  }
};
  
  export const addTicket = async ( ticketData) => {
    try {
    const response = await axiosInstance.post("/ticket/add", ticketData);
    return response.data; 
  } catch (error) {
    console.error('Error caught:', error);
  }
};