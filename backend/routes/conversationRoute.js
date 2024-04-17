const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const conversationController = require("../controllers/conversationController");
router.post(
  "/add",
  upload.array("attachment"),
  asyncHandler(conversationController.createConversation)
);
router.get("/get", asyncHandler(conversationController.getAll));
router.get("/fetch/:id", asyncHandler(conversationController.getAllByTicketId));
router.get("/get/:id", asyncHandler(conversationController.getConversation));
router.put(
  "/update/:id",
  asyncHandler(conversationController.updateConversation)
);
router.delete(
  "/delete/:id",
  asyncHandler(conversationController.deleteConversation)
);
module.exports = router;
