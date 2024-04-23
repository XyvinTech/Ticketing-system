import { create } from "zustand";
import { fetchTickets, fetchTicketById, addTicket } from "../api/ticketapi";

const useTicketStore = create((set) => ({
  tickets: [],
  fetchTickets:async () => {
    const allTicketData=await fetchTickets();
    set({ tickets: allTicketData });

  },
  ticket: null,
  fetchTicketById:async (ticketId) => {
    const ticketByid=await fetchTicketById(ticketId);
    set({ticket: ticketByid })
  },
  addTicket: async(ticketData) => {
    const addTickets=addTicket( ticketData);
    set((state) => ({ tickets: [...state.tickets,addTickets] }));

},}));

export { useTicketStore };
