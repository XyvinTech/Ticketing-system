const express = require("express");
const router = express.Router();
const adminController =require("../controllers/adminController")
const asyncHandler = require("../utils/asyncHandler")
router.post("/add",asyncHandler(adminController.addAdmin))
router.get("/get/:id",asyncHandler(adminController.getAdmin))
router.put("/update/:id",asyncHandler(adminController.updateAdmin))
router.delete("/delete/:id",asyncHandler(adminController.deleteAdmin))
module.exports = router;
