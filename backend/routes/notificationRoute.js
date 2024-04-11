const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
const notificationController=require("../controllers/notificationController")
router.post("/add",asyncHandler(notificationController.createNotification))
router.get("/get/:id",asyncHandler(notificationController.getNotification))
router.get("/get",asyncHandler(notificationController.getAll))
router.put("/update/:id",asyncHandler(notificationController.updateNotification))
router.delete("/delete/:id",asyncHandler(notificationController.deleteNotification))
module.exports = router;
