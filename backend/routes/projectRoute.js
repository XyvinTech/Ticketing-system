const express = require("express");
const { createProject, getProject, getAll, updateProject, deleteProject } = require("../controllers/projectController");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
router.post("/add",asyncHandler(createProject))
router.get("/get/:id",asyncHandler(getProject))
router.get("/get",asyncHandler(getAll))
router.put("/update/:id",asyncHandler(updateProject))
router.delete("/delete/:id",asyncHandler(deleteProject))
module.exports = router;
