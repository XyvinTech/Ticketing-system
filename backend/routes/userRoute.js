const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
const {
 
  profileUpdate,
  passwordupdate,
  getUser,
 
} = require("../controllers/userController");
// const { verifyToken } = require("../utils/verifyUser");
router.get("/profile/:id",getUser);
router.put(
  "/profileupdate",

  upload.single("profilePicture"),
  profileUpdate
);
router.put("/passwordupdate",  passwordupdate);
module.exports = router;
