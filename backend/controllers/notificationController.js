const Notification=require("../models/notification")
const createError = require("http-errors");
const User = require("../models/user");


// get All Notification 
exports.getAll = async function (req, res){
  
  const notifications = await Notification.find({user:req.user});
  res.status(200).json({ status: true, message: "OK", data: notifications });
};
 