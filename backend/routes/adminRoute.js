const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const asyncHandler = require("../utils/asyncHandler");

router.put("/update/:id", asyncHandler(adminController.updateAdminUser));

router.post("/add-user", asyncHandler(adminController.addUser));

router.delete("/delete-user/:id", asyncHandler(adminController.deleteUser));

router.get("/get-user", asyncHandler(adminController.getUsers));

module.exports = router;
