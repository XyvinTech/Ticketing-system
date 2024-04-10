const express = require("express");
const { createNotification, getAll, getNotification, updateNotification, deleteNotification } = require("../controllers/notificationController");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
router.post("/add",asyncHandler(createNotification))
router.get("/get/:id",asyncHandler(getNotification))
router.get("/get",asyncHandler(getAll))
router.put("/update/:id",asyncHandler(updateNotification))
router.delete("/delete/:id",asyncHandler(deleteNotification))
module.exports = router;
