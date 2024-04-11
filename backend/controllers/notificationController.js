const Notification=require("../models/notification")
const createError = require("http-errors");

//create Notification
module.exports.createNotification = async function (req, res) {
  const data = new Notification(req.body);
  console.log(data);
  await data.save();
  res.status(201).json({ status: true, message: "ok" });
};
// get All Notification 
module.exports.getAll = async function (req, res){
  const notifications = await Notification.find();
  res.status(200).json({ status: true, message: "OK", data: notifications });
};
//get notification by id
module.exports.getNotification = async function(req, res){
  const notificationId = req.params.id;
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw createError(404, "Notification not found");
  }

  res.json({ status: true, data: notification });
};
//update conversation
module.exports.updateNotification = async function(req, res)  {
  const notificationId = req.params.id;
  const update = req.body; 
  const notification = await Notification.findByIdAndUpdate(notificationId,update,{new:true});

  if (!notification) {
    throw createError(404, "Notification not found");
  }
  res.status(200).json({ status: true, message: "ok" });
};
 //delete conversation
 module.exports.deleteNotification = async function(req, res) {
  const notificationId = req.params.id;
  const deletedNotification = await Notification.findByIdAndDelete(notificationId);

  if (!deletedNotification) {
    throw createError(404, "Notification not found");
  }

  res.status(200).json({ status: true, message: "ok" });
};