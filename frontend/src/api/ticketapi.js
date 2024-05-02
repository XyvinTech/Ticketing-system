import axiosInstance from "./axiosintercepter";

export const fetchTickets = async (filter) => {
  try {
    const response = await axiosInstance.get("/ticket/get",{
      params: filter
    });
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
export const updateTicket = async (ticketId, updateData) => {
  try {
    const response = await axiosInstance.put(`/ticket/update/${ticketId}`, updateData);
    // console.log(response.data)
    return response.data;
   
  } catch (error) {
    console.error('Error caught:', error);
  }
};