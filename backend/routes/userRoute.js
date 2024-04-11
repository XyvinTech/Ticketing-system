const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
const userController=require("../controllers/userController")
const asyncHandler=require("../utils/asyncHandler")
// const { verifyToken } = require("../utils/verifyUser");
router.get("/profile/:id",asyncHandler(userController.getUser));
router.put(
  "/profileupdate",

  upload.single("profilePicture"),asyncHandler(
  userController.profileUpdate)
);
router.put("/passwordupdate/:id", asyncHandler(userController.passwordupdate));
module.exports = router;
