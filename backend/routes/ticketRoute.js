const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
const ticketController=require("../controllers/ticketController")
router.post("/add", upload.single("attachment"),asyncHandler(ticketController.createTicket))
router.get("/get",asyncHandler(ticketController.getAll))
router.get("/get/:id",asyncHandler(ticketController.getTicket))
router.put("/update/:id",asyncHandler(ticketController.updateTicket))
router.delete("/delete/:id",asyncHandler(ticketController.deleteTicket))
module.exports = router;
