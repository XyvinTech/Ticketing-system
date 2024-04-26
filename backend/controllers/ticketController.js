const Ticket = require("../models/ticket");
const createError = require("http-errors");

//create New Ticket
exports.createTicket = async function(req, res) {
  const { priority, category, subject, description } = req.body;

  // Extract filenames 
  const attachmentFilenames = req.files.map(file => file.filename);

    const ticket = new Ticket({
      priority,
      category,
      subject,
      description,
      attachment: attachmentFilenames ,
    });

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
    if (!ticketId) {
      return res.status(400).json({ error: "Ticket ID is required" });
    }
    const ticket = await Ticket.findById(ticketId);
  
    if (!ticket || ticket.length === 0) {
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
