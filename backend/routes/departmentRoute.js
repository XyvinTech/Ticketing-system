const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const asyncHandler = require("../utils/asyncHandler");
router.post("/create", asyncHandler(departmentController.createDepartment));
router.put(
  "/edit/:departmentId",
  asyncHandler(departmentController.editDepartmentMember)
);
router.get("/get", asyncHandler(departmentController.getDepartments));
router.delete(
  "/delete/:id",
  asyncHandler(departmentController.deleteDepartment)
);
router.put("/update/:id", asyncHandler(departmentController.updateDepartment));
module.exports = router;
