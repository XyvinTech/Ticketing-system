const Notification=require("../models/notification")
const createError = require("http-errors");

//create Notification
const createNotification = async (req, res) => {
  const data = new Notification(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
// get All Notification 
const getAll = async (req, res) => {
  const notifications = await Notification.find();
  res.status(200).json({ status: true, message: "OK", data: notifications });
};
//get notification by id
const getNotification = async (req, res) => {
  const notificationId = req.params.id;
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw createError(404, "Notification not found");
  }

  res.json({ status: true, data: notification });
};
//update conversation
const updateNotification = async (req, res) => {
  const notificationId = req.params.id;
  let notification = await Notification.findById(notificationId);

  if (!notification) {
    throw createError(404, "Notification not found");
  }
  notification.set(req.body);
  await notification.save();
  res.status(201).json({ status: true, message: "ok" });
};
 //delete conversation
const deleteNotification = async (req, res) => {
  const notificationId = req.params.id;
  const deletedNotification = await Notification.findByIdAndDelete(notificationId);

  if (!deletedNotification) {
    throw createError(404, "Notification not found");
  }

  res.status(201).json({ status: true, message: "ok" });
};
module.exports = { createNotification ,getAll,getNotification,updateNotification,deleteNotification};