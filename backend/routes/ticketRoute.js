const express = require("express");
const { createTicket, getTicket, updateTicket, deleteTicket, getAll } = require("../controllers/ticketController");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
router.post("/add",asyncHandler(createTicket))
router.get("/get",asyncHandler(getAll))
router.get("/get/:id",asyncHandler(getTicket))
router.put("/update/:id",asyncHandler(updateTicket))
router.delete("/delete/:id",asyncHandler(deleteTicket))
module.exports = router;
