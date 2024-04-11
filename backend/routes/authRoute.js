const express = require("express");
const authController=require("../controllers/authController")
const asyncHandler=require("../utils/asyncHandler")
const router = express.Router();
router.post("/signup", asyncHandler(authController.signup))
router.get("/signin",asyncHandler(authController.signin))
router.post("/google",asyncHandler(authController.google))
module.exports = router;
