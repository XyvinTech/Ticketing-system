const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const asyncHandler = require("../utils/asyncHandler");
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         phoneNumber:
 *           type: number
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profilePicture:
 *           type: string
 *         usertype:
 *           type: string
 *           enum: ["projectManager", "projectLead", "client", "member"]
 *         projectId:
 *           type: array
 *           items:
 *             type: string
 */



router.post("/signup", asyncHandler(authController.signUp));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: User not found
 *       '401':
 *         description: Invalid credentials
 *      
 */
router.post("/login", asyncHandler(authController.logIn));

module.exports = router;
