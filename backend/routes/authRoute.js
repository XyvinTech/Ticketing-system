const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const asyncHandler = require("../utils/asyncHandler");
router.post("/login", asyncHandler(authController.logIn));
module.exports = router;
