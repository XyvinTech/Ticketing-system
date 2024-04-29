const Ticket = require("../models/ticket");
const createError = require("http-errors");
const Project = require("../models/project");
const User = require("../models/user");
const Notification = require("../models/notification");
const sendMail = require("../utils/sendMail");

//create New Ticket
exports.createTicket = async function (req, res) {
  const getProject = await Project.findById(req.body.projectId);
  const ticketCount = await Ticket.countDocuments({ projectId: req.body.projectId });
  const ticket_Id = getProject.projectName.toUpperCase().slice(0, 3);

  req.body.ticket_Id = ticket_Id + "-00" + (ticketCount + 1);
  req.body.reporter = req.user;

  const data = await Ticket.create(req.body);

  const findUser = await User.find({
    usertype: { $in: ["projectManager", "projectLead"] },
    projectId: req.body.projectId,
  });

  // * Uncomment the following line for production
  // let populatedTicket = await data.populate("reporter");
  // populatedTicket = await populatedTicket.populate("department");

  // const tickeObj = {
  //   _id: populatedTicket._id,
  //   ticket_Id: populatedTicket.ticket_Id,
  //   mail: populatedTicket.reporter? populatedTicket.reporter.email : admin,
  //   department: populatedTicket.department.departmentName,
  //   description: populatedTicket.description,
  //   updatedAt: populatedTicket.updatedAt,
  //   priority: populatedTicket.priority,
  // };

  const notifications = [];

  findUser.forEach((user) => {
    const notification = new Notification({
      user: user._id,
      message: `A new ticket (#${req.body.ticket_Id}) has been created`,
      ticketId: data._id,
    });

    // * Uncomment the following line for production
    // sendMail(user.email, tickeObj, user.usertype);

    notifications.push(notification);
  });

  await Notification.insertMany(notifications);

  res.status(201).json({ status: true, message: "Ticket created successfully", data });
};

//get all tickets
exports.getAll = async function (req, res) {
  const tickets = await Ticket.find({ status: { $ne: "deleted" } })
    .populate("department", "departmentName")
    .populate("projectId")
    .populate("assignedTo");
  res.status(200).json({ status: true, data: tickets });
};

//get ticket by id
exports.getTicket = async function (req, res) {
  const ticketId = req.params.id;
  if (!ticketId) {
    return res.status(400).json({ error: "Ticket ID is required" });
  }
  const ticket = await Ticket.findById(ticketId)
    .populate("department", "departmentName")
    .populate("projectId");

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
  const deletedTicket = await Ticket.findByIdAndUpdate(ticketId, { status: "deleted", new: true });
  if (!deletedTicket) {
    throw createError(404, "Ticket  not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};
