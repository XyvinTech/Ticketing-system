const express = require("express");
const { addAdmin, getAdmin, updateAdmin, deleteAdmin} = require('../controllers/adminController');
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
router.post("/add",asyncHandler(addAdmin))
router.get("/get/:id",asyncHandler(getAdmin))
router.put("/update/:id",asyncHandler(updateAdmin))
router.delete("/delete/:id",asyncHandler(deleteAdmin))
module.exports = router;
