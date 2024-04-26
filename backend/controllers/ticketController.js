const Ticket = require("../models/ticket");
const createError = require("http-errors");
const uploadFilesToS3 = require("../utils/uploadFileToS3");
const Project = require("../models/project");

//create New Ticket
exports.createTicket = async function (req, res) {
  const getProject = await Project.findById(req.body.projectId);
  const ticketCount = await Ticket.countDocuments({ projectId: req.body.projectId });
  const ticket_Id = getProject.projectName.toUpperCase().slice(0, 3);

  req.body.ticket_Id = ticket_Id + "-00" + (ticketCount + 1);

  const data = await Ticket.create(req.body);

  res.status(201).json({ status: true, message: "Ticket created successfully", data });
};

//get all tickets
exports.getAll = async function (req, res) {
  const tickets = await Ticket.find();
  res.status(200).json({ status: true, data: tickets });
};

//get ticket by id
exports.getTicket = async function (req, res) {
  const ticketId = req.params.id;
  if (!ticketId) {
    return res.status(400).json({ error: "Ticket ID is required" });
  }
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw createError(404, "Ticket not found");
  }

  res.status(200).json({ status: true, data: ticket });
};
//update ticket
exports.updateTicket = async function (req, res) {
  const updateId = req.params.id;
  const update = req.body;
  const updateTicket = await Ticket.findByIdAndUpdate(updateId, update, { new: true });

  if (!updateTicket) {
    throw createError(404, "Ticket not found");
  }
  res.status(200).json({ status: true, message: "ok", data: updateTicket });
};
//delete Ticket
exports.deleteTicket = async function (req, res) {
  const ticketId = req.params.id;
  const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

  if (!deletedTicket) {
    throw createError(404, "Ticket  not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};

exports.uploadImage = async function (req, res) {
  const files = req.files;
  if (files.length > 0) {
    const response = await uploadFilesToS3(files);
    if (response.status) {
      res.status(200).json({ status: true, message: "ok", data: response.results });
    }
  }
  res.status(400).json({ message: "Image upload failed" });
};
