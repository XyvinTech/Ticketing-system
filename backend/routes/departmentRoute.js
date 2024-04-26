const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const asyncHandler = require("../utils/asyncHandler");
router.post("/create", asyncHandler(departmentController.createDepartment));
router.put("/edit/:departmentId", asyncHandler(departmentController.editDepartment));
module.exports = router;
