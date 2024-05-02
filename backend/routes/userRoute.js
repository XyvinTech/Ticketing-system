const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
const userController = require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");
// const { verifyToken } = require("../utils/verifyUser");
router.get("/get", asyncHandler(userController.getUser));
router.put("/update", asyncHandler(userController.updateUser));
router.put("/passwordupdate/", asyncHandler(userController.passwordupdate));
module.exports = router;
