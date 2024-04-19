import { create } from "zustand";
import { fetchTickets, fetchTicketById, addTicket } from "../api/ticketapi";

const useTicketStore = create((set) => ({
  tickets: [],
  fetchTickets: () => fetchTickets(set),
  ticket: null,
  fetchTicketById: (ticketId) => fetchTicketById(set, ticketId),
  addTicket: (ticketData) => addTicket(set, ticketData),
}));

export { useTicketStore };
