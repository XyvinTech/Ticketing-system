import { create } from "zustand";
import {
  fetchTickets,
  fetchTicketById,
  addTicket,
  updateTicket,
} from "../api/ticketapi";

const useTicketStore = create((set) => ({
  tickets: [],
  fetchTickets: async () => {
    const allTicketData = await fetchTickets();
    set({ tickets: allTicketData.data });
  },
  fetchTicketById: async (ticketId) => {
    const ticketByid = await fetchTicketById(ticketId);

    set({ tickets: ticketByid.data });
  },
  addTicket: async (ticketData) => {
    const addTickets = addTicket(ticketData);
    set((state) => ({ tickets: [...state.tickets, addTickets] }));
  },
  updateTicket: async (ticketId, updateData) => {
    const updateTickets = updateTicket(ticketId, updateData);
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, ...updateTickets } : ticket
      ),
    }));
  },
}));

export { useTicketStore };
