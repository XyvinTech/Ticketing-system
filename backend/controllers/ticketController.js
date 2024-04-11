const Ticket = require("../models/ticket");
const createError = require("http-errors");

//create New Ticket
module.exports.createTicket = async function(req, res) {
  const data = new Ticket(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
//get all tickets
module.exports.getAll = async function(req, res) {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //get ticket by id
  module.exports.getTicket = async function(req, res)  {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
  
    if (!ticket) {
      throw createError(404, "Ticket not found");
    }
  
    res.json({ status: true, data: ticket });
  };
//update ticket
module.exports.updateTicket = async function(req, res) {
  const updateId = req.params.id;
  const update = req.body; 
  const updateTicket = await Ticket.findById(updateId, update, { new: true });

  if (!updateTicket) {
    throw createError(404, "Ticket not found");
  }
  res.status(200).json({ status: true, message: "ok" });
};
//delete Ticket
module.exports.deleteTicket = async function(req, res) {
  const ticketId = req.params.id;
  const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

  if (!deletedTicket) {
    throw createError(404, "Ticket  not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};
