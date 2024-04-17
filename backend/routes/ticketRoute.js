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
const ticketController = require("../controllers/ticketController");
router.post(
  "/add",
  upload.array("attachment"),
  asyncHandler(ticketController.createTicket)
);
router.get("/get", asyncHandler(ticketController.getAll));
router.get("/get/:id", asyncHandler(ticketController.getTicket));
router.put("/update/:id", asyncHandler(ticketController.updateTicket));
router.delete("/delete/:id", asyncHandler(ticketController.deleteTicket));
module.exports = router;
