const Notification = require("../models/notification");
const createError = require("http-errors");
const User = require("../models/user");

exports.getAll = async function (req, res) {
  const user = await User.findById(req.user);

 
   const notifications = await Notification.find({ user: req.user });
  

  res.status(200).json({ status: true, message: "OK", data: notifications });
};
exports.markAllAsRead = async function (req, res, next) {
  // Find the user
  // const user = await User.findById(req.user);

  // Update the notifications belonging to the user
  await Notification.updateMany({ user: req.user }, { $set: { isRead: true } });

  res
    .status(200)
    .json({ status: true, message: "All user notifications marked as read" });
};
