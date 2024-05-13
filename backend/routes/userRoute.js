/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User-related endpoints
 * security:
 *   - bearerAuth: []
 */
const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
const userController = require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");

router.get("/get", asyncHandler(userController.getUser));

router.put("/update", asyncHandler(userController.updateUser));

router.put("/passwordupdate/", asyncHandler(userController.passwordupdate));

router.get("/getUser", asyncHandler(userController.getUserByProjectId));
module.exports = router;
