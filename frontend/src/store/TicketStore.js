import { create } from "zustand";
import {
  fetchTickets,
  fetchTicketById,
  addTicket,
  updateTicket,
  deleteTicket,
} from "../api/ticketapi";

const useTicketStore = create((set) => ({
  tickets: [],
  fetchTickets: async (filter) => {
    const allTicketData = await fetchTickets(filter);
    set({ tickets: allTicketData?.data });
  },
  fetchTicketById: async (ticketId) => {
    const ticketByid = await fetchTicketById(ticketId);

    set({ tickets: ticketByid.data });
  },
  addTicket: async (ticketData) => {
    const addTickets = await addTicket(ticketData); // Assuming addTicket returns a promise
    set((state) => ({ 
      tickets: Array.isArray(state.tickets) ? [...state.tickets, addTickets] : [addTickets] 
    }));
  },
  
  updateTicket: async (ticketId, updateData) => {
    const updateTickets = updateTicket(ticketId, updateData);
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, ...updateTickets } : ticket
      ),
    }));
  },
  deleteTicket:async(ticektId)=>{
    await deleteTicket(ticektId);
},
}));

export { useTicketStore };
