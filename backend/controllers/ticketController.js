const Ticket = require("../models/ticket");
const createError = require("http-errors");
const Project = require("../models/project");
const User = require("../models/user");
const Notification = require("../models/notification");
const sendMail = require("../utils/sendMail");

//create New Ticket
exports.createTicket = async function (req, res) {
  const getProject = await Project.findById(req.body.projectId);

  const ticketCount = await Ticket.countDocuments({
    projectId: req.body.projectId,
  });
  const ticket_Id = getProject.projectName.toUpperCase().slice(0, 3);

  req.body.ticket_Id = ticket_Id + "-00" + (ticketCount + 1);
  req.body.reporter = req.user;

  const data = await Ticket.create(req.body);

  const findUser = await User.find({
    $and: [
      { _id: { $ne: req.user } }, // Exclude the reporter user
      {
        $or: [
          { usertype: "admin" }, // Find admin users
          {
            $and: [
              { usertype: { $in: ["projectLead", "manager"] } }, // Find projectLead and manager users
              { projectId: req.body.projectId }, // Filter by the projectId of the sender
            ],
          },
        ],
      },
    ],
  });
  console.log("users", findUser);
  // * Uncomment the following line for production
  let populatedTicket = await data.populate("reporter");
  populatedTicket = await populatedTicket.populate("department");

  const tickeObj = {
    _id: populatedTicket._id,
    ticket_Id: populatedTicket.ticket_Id,
    mail: populatedTicket.reporter && populatedTicket.reporter.email,
    department: populatedTicket.department.departmentName,
    description: populatedTicket.description,
    updatedAt: populatedTicket.updatedAt,
    priority: populatedTicket.priority,
  };

  const notifications = [];
  if (findUser) {
    findUser.forEach((user) => {
      const notification = new Notification({
        user: user._id,
        message: `A new ticket (#${req.body.ticket_Id}) has been created`,
        ticketId: data._id,
      });

      // * Uncomment the following line for production
      sendMail(user.email, tickeObj, user.usertype);

      notifications.push(notification);
    });

    await Notification.insertMany(notifications);
  }
  res
    .status(201)
    .json({ status: true, message: "Ticket created successfully", data });
};

//get all tickets
exports.getAll = async function (req, res) {
  const { searchQuery, inStatus, inDep } = req.query;

  const query = {
    status: { $ne: "deleted" },
  };

  if (inStatus) {
    query.status = inStatus;
  }
  if (inDep) {
    if (inDep === "myticket") {
      query.reporter = req.user;
    } else {
      query.department = inDep;
    }
  }

  if (searchQuery) {
    query.$or = [{ subject: { $regex: searchQuery, $options: "i" } }];
  }

  const user = await User.findById(req.user);
  if (user.usertype === "admin") {
    const tickets = await Ticket.find(query)
      .populate("department")
      .populate("projectId")
      .populate("assignedTo");

    res.status(200).json({ status: true, data: tickets });
  } else if (user.usertype === "member") {
    const query = {
      assignedTo: req.user,
      status: { $ne: "deleted" },
    };
    if (inStatus) {
      query.status = inStatus;
    }

    if (searchQuery) {
      query.$or = [{ subject: { $regex: searchQuery, $options: "i" } }];
    }
    const tickets = await Ticket.find(query)
      .populate("department", "departmentName")
      .populate("projectId")
      .populate("assignedTo");

    res.status(200).json({ status: true, data: tickets });
  } else if (user.usertype === "client") {
    const query = {
      reporter: req.user,
      status: { $ne: "deleted" },
    };
    if (inStatus) {
      query.status = inStatus;
    }

    if (searchQuery) {
      query.$or = [{ subject: { $regex: searchQuery, $options: "i" } }];
    }
    const tickets = await Ticket.find(query)
      .populate("department", "departmentName")
      .populate("projectId")
      .populate("assignedTo");

    res.status(200).json({ status: true, data: tickets });
  } else {
    const projectIds = user.projectId.map((id) => id.toString());

    const query = {
      $or: [{ projectId: { $in: projectIds } }, { assignedTo: req.user }],
      status: { $ne: "deleted" },
    };
    if (inDep) {
      if (inDep === "myticket") {
        query.reporter = req.user;
      }
    }
    if (inStatus) {
      query.status = inStatus;
    }

    if (searchQuery) {
      query.$or = [{ subject: { $regex: searchQuery, $options: "i" } }];
    }

    const tickets = await Ticket.find(query)
      .populate("department", "departmentName")
      .populate("projectId")
      .populate("assignedTo");
    console.log("tick", tickets);
    res.status(200).json({ status: true, data: tickets });
  }
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
  // console.log("Update boidt", update);
  // console.log("Update boidt", updateId);
  if (update.assignedTo) {
    update.status = "progress";
  }

  const updateTicket = await Ticket.findByIdAndUpdate(updateId, update, {
    new: true,
  });

  if (!updateTicket) {
    throw createError(404, "Ticket not found");
  }

  const notification = new Notification({
    user: updateTicket.reporter, // Assuming assignedTo contains the user ID
    message: `Ticket #${updateTicket.ticket_Id} status changed to ${updateTicket.status}`,
    ticketId: updateTicket._id,
  });

  // Save the notification
  await notification.save();
  if (update.assignedTo) {
    const memberNotification = new Notification({
      user: updateTicket.assignedTo, // Assuming assignedTo contains the user ID
      message: `Ticket #${updateTicket.ticket_Id} has been assigned`,
      ticketId: updateTicket._id,
    });
    await memberNotification.save();
  }
  const findUser = await User.find({
    $and: [
      { _id: { $ne: req.user } },
      {
        $or: [
          { usertype: "admin" }, // Find admin users
          {
            $and: [
              { usertype: { $in: ["projectLead", "manager"] } }, // Find projectLead and manager users
              { projectId: req.body.projectId }, // Filter by the projectId of the sender
            ],
          },
        ],
      },
    ],
  });

  console.log("notusers", findUser);
  findUser.forEach(async (user) => {
    const managerNotification = new Notification({
      user: user._id,
      message: `Ticket #${updateTicket.ticket_Id} status changed to ${updateTicket.status}`,
      ticketId: updateTicket._id,
    });
    await managerNotification.save();
  });
  res.status(200).json({ status: true, message: "ok", data: updateTicket });
};

//delete Ticket
exports.deleteTicket = async function (req, res) {
  console.log(req.body);
  const { ticketIds } = req.body;
  const deleteResult = await Ticket.deleteMany({ _id: { $in: ticketIds } });

  if (deleteResult.deletedCount > 0) {
    res.status(200).json({ message: "Tickets deleted successfully" });
  } else {
    res.status(404).json({ message: "No tickets found with the provided IDs" });
  }
};
