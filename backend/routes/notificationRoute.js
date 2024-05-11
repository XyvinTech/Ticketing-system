const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
const notificationController=require("../controllers/notificationController")
router.put('/markAllRead',asyncHandler( notificationController.markAllAsRead));
router.get("/get",asyncHandler(notificationController.getAll))
module.exports = router;
