const express = require("express");
const { createConversation, getConversation, updateConversation, deleteConversation, getAll } = require("../controllers/conversationController");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
router.post("/add",asyncHandler(createConversation))
router.get("/get",asyncHandler(getAll))
router.get("/get/:id",asyncHandler(getConversation))
router.put("/update/:id",asyncHandler(updateConversation))
router.delete("/delete/:id",asyncHandler(deleteConversation))
module.exports = router;
