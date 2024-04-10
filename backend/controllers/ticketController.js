const Ticket = require("../models/ticket");
const createError = require("http-errors");

//create New Ticket
const createTicket = async (req, res) => {
  const data = new Ticket(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
//get all tickets
const getAll = async (req, res) => {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //get ticket by id
  const getTicket = async (req, res) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
  
    if (!ticket) {
      throw createError(404, "Ticket not found");
    }
  
    res.json({ status: true, data: ticket });
  };
//update ticket
const updateTicket = async (req, res) => {
  const updateId = req.params.id;
  let update = await Ticket.findById(updateId);

  if (!update) {
    throw createError(404, "Ticket not found");
  }
  update.set(req.body);
  await update.save();
  res.status(201).json({ status: true, message: "ok" });
};
//delete Ticket
const deleteTicket = async (req, res) => {
  const ticketId = req.params.id;
  const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

  if (!deletedTicket) {
    throw createError(404, "Ticket  not found");
  }

  res.status(201).json({ status: true, message: "ok" });
};
module.exports = {
  createTicket,
  getTicket,
  updateTicket,deleteTicket,getAll
};
