const express = require("express");
const multer = require("multer");

//~ Define a filter function for multer file uploads
const filter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG, PNG and PDF is allowed!"), false);
  }
};
//~ Create a multer instance with the defined filter
const upload = multer({ fileFilter: filter });

const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const ticketController = require("../controllers/ticketController");
router.post("/add", asyncHandler(ticketController.createTicket));
router.get("/get", asyncHandler(ticketController.getAll));
router.get("/get/:id", asyncHandler(ticketController.getTicket));
router.put("/update/:id", asyncHandler(ticketController.updateTicket));
router.delete("/delete/:id", asyncHandler(ticketController.deleteTicket));
router.post("/upload", upload.array("attachments"), asyncHandler(ticketController.uploadImage));
module.exports = router;
