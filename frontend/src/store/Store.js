import {create} from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  tickets: [],
  ticket: [],
  fetchTickets: async () => {
    try {
      const response = await axios.get("http://localhost:4000/ticket/get");
      console.log("Response from fetchTickets:", response.data); // Log response data
      set({ tickets: response.data });
      
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  },
  fetchTicketById: async (ticketId) => {
    try {
      const response = await axios.get(`http://localhost:4000/ticket/get/${ticketId}`);
      console.log("Response from fetchTickets:", response.data); // Log response data
      set({ ticket: response.data });
    } catch (error) {
      console.error("Error fetching ticket by ID:", error);
    }
  },
  addTicket: async (ticketData) => {
    try {
      const response = await axios.post("http://localhost:4000/ticket/add", ticketData); // Assuming your backend endpoint for creating a ticket is "/tickets"
      const newTicket = response.data;
      set((state) => ({ tickets: [...state.tickets, newTicket] }));
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  },
  conversation: [],
  addConversation: async (conversationData) => {
    try {
      const response = await axios.post("http://localhost:4000/conversation/add", conversationData); // Assuming your backend endpoint for creating a ticket is "/tickets"
      const newConversation = response.data;
      set((state) => ({ conversation: [...state.conversation, newConversation] }));
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  },
  fetchConversationById: async (ConversationId) => {
    try {
      const response = await axios.get(`http://localhost:4000/conversation/fetch/${ConversationId}`);
      console.log("Response from fetchTickets:", response.data); // Log response data
      set({ conversation: response.data });
    } catch (error) {
      console.error("Error fetching ticket by ID:", error);
    }
  },
}));

export { useStore };
