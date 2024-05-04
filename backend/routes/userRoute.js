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
// const { verifyToken } = require("../utils/verifyUser");

/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Get loggined user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 */
router.get("/get", asyncHandler(userController.getUser));
/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *       '404':
 *         description: User not found
 */
router.put("/update", asyncHandler(userController.updateUser));
/**
 * @swagger
 * /user/passwordupdate:
 *   put:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *       '401':
 *         description: Unauthorized - Current password is invalid
 *       '404':
 *         description: User not found
 */
router.put("/passwordupdate/", asyncHandler(userController.passwordupdate));
/**
 * @swagger
 * /user/getUser/{id}:
 *   get:
 *     summary: Get users by project ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: withOutClient
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: inManager
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: inLead
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid project ID
 *       '404':
 *         description: No user found for the provided project ID
 */

router.get("/getUser/:id", asyncHandler(userController.getUserByProjectId));
module.exports = router;
