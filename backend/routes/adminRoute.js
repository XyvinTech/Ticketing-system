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
 *   name: Admin
 *   description: Admin-related endpoints
 * security:
 *   - bearerAuth: []
 */

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const asyncHandler = require("../utils/asyncHandler");
/**
 * @swagger
 * /admin/update/{id}:
 *   put:
 *     summary: Update admin user by ID
 *     tags: [Admin]
*     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'  # Reference your User schema here
 *     responses:
 *       '200':
 *         description: Admin user updated successfully
 *       '404':
 *         description: Admin user not found
 */
router.put("/update/:id", asyncHandler(adminController.updateAdminUser));

/**
 * @swagger
 * /admin/add-user:
 *   post:
 *     summary: Add a new user by admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'  # Reference your User schema here
 *     responses:
 *       '201':
 *         description: User added successfully
 *       '409':
 *         description: User already exists
 */

router.post("/add-user", asyncHandler(adminController.addUser));

/**
 * @swagger
 * /admin/delete-user/{id}:
 *   delete:
 *     summary: Delete a user by admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */

router.delete("/delete-user/:id", asyncHandler(adminController.deleteUser));

/**
 * @swagger
 * /admin/get-user:
 *   get:
 *     summary: Get all users with query
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: usertype
 *         schema:
 *           type: string
 *         description: Filter users by type (e.g., projectManager, projectLead, client, member)
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: Search users by name or email
 *       - in: query
 *         name: withOutClient
 *         schema:
 *           type: boolean
 *         description: Exclude clients from the results
 *       - in: query
 *         name: inManager
 *         schema:
 *           type: boolean
 *         description: Filter users except project managers
 *       - in: query
 *         name: inLead
 *         schema:
 *           type: boolean
 *         description: Filter users except project leads
 *     responses:
 *       '200':
 *         description: List of users retrieved successfully
 */

router.get("/get-user", asyncHandler(adminController.getUsers));

// /**
//  * @swagger
//  * /admin/update-password:
//  *   put:
//  *     summary: Update admin password
//  *     tags: [Admin]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               currentPassword:
//  *                 type: string
//  *               newPassword:
//  *                 type: string
//  *     responses:
//  *       '200':
//  *         description: Password updated successfully
//  *       '400':
//  *         description: Invalid request
//  *       '401':
//  *         description: Unauthorized, authentication failed
//  */

// router.put("/update-password", asyncHandler(adminController.updatePassword));

module.exports = router;
