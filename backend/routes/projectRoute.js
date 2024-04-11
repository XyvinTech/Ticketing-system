const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
const projectController=require("../controllers/projectController")
router.post("/add",asyncHandler(projectController.createProject))
router.get("/get/:id",asyncHandler(projectController.getProject))
router.get("/get",asyncHandler(projectController.getAll))
router.put("/update/:id",asyncHandler(projectController.updateProject))
router.delete("/delete/:id",asyncHandler(projectController.deleteProject))
module.exports = router;
