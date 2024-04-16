const Ticket = require("../models/ticket");
const createError = require("http-errors");

//create New Ticket
exports.createTicket = async function(req, res) {
  let attachmentData = null;
    
    // Check if a file was uploaded
    if (req.file) {
      // Access the uploaded file data
      attachmentData = req.file.buffer
      
    }

    const ticketData = {
      ...req.body,
      attachment: attachmentData // Add attachment data to the ticket data
    };

    const ticket = new Ticket(ticketData);
    await ticket.save();

    res.status(201).json({ status: true, message: "Ticket created successfully" });
};
//get all tickets
exports.getAll = async function(req, res) {
    
      const tickets = await Ticket.find();
      res.json(tickets);
  
  };

  //get ticket by id
  exports.getTicket = async function(req, res)  {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
  
    if (!ticket) {
      throw createError(404, "Ticket not found");
    }
  
    res.json(ticket );
  };
//update ticket
exports.updateTicket = async function(req, res) {
  const updateId = req.params.id;
  const update = req.body; 
  const updateTicket = await Ticket.findById(updateId, update, { new: true });

  if (!updateTicket) {
    throw createError(404, "Ticket not found");
  }
  res.status(200).json({ status: true, message: "ok" });
};
//delete Ticket
exports.deleteTicket = async function(req, res) {
  const ticketId = req.params.id;
  const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

  if (!deletedTicket) {
    throw createError(404, "Ticket  not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};
