import axiosInstance from "./axiosintercepter";
import asyncHandler from "../utils/asyncHandler";

export const fetchTickets = asyncHandler(async (set) => {
    const response = await axiosInstance.get("/ticket/get");
    set({ tickets: response.data });
  });
  
  export const fetchTicketById = asyncHandler(async (set, ticketId) => {
    const response = await axiosInstance.get(`/ticket/get/${ticketId}`);
    set({ ticket: response.data });
  });
  
  export const addTicket = asyncHandler(async (set, ticketData) => {
    const response = await axiosInstance.post("/ticket/add", ticketData);
    const newTicket = response.data;
    set((state) => ({ tickets: [...state.tickets, newTicket] }));
  });