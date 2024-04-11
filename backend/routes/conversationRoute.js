const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
const conversationController =require("../controllers/conversationController")
router.post("/add",asyncHandler(conversationController.createConversation))
router.get("/get",asyncHandler(conversationController.getAll))
router.get("/get/:id",asyncHandler(conversationController.getConversation))
router.put("/update/:id",asyncHandler(conversationController.updateConversation))
router.delete("/delete/:id",asyncHandler(conversationController.deleteConversation))
module.exports = router;
