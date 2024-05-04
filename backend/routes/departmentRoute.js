/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project-related endpoints
 * security:
 *   - bearerAuth: []
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         departmentName:
 *           type: string
 *         description:
 *           type: string
 *         members:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - departmentName
 *
 */
const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const asyncHandler = require("../utils/asyncHandler");
/**
 * @swagger
 * /department/create:
 *   post:
 *     summary: Create a new department
 *     tags: [Department]
*     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       '201':
 *         description: Department created successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: Department already exists
 */
router.post("/create", asyncHandler(departmentController.createDepartment));
/**
 * @swagger
 * /department/edit/{departmentId}:
 *   put:
 *     summary: Edit department members
 *     tags: [Department]
*     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
  *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Action to perform on the department members (push or pop)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       '200':
 *         description: Department updated successfully
 *       '404':
 *         description: Department not found
 */
router.put("/edit/:departmentId", asyncHandler(departmentController.editDepartmentMember));
/**
 * @swagger
 * /department/get:
 *   get:
 *     summary: Get all departments
 *     tags: [Department]
*     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Departments fetched successfully
 *       '404':
 *         description: No departments found
 */
router.get("/get", asyncHandler(departmentController.getDepartments));
/**
 * @swagger
 * /department/delete/{id}:
 *   delete:
 *     summary: Delete a department
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Department deleted successfully
 *       '404':
 *         description: Department not found
 */

router.delete("/delete/:id", asyncHandler(departmentController.deleteDepartment));
/**
 * @swagger
 * /department/update/{id}:
 *   put:
 *     summary: Update a department
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       '200':
 *         description: Department updated successfully
 *       '404':
 *         description: Department not found
 */
router.put("/update/:id", asyncHandler(departmentController.updateDepartment));
module.exports = router;
