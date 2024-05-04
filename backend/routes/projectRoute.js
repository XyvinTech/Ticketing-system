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
 *     Project:
 *       type: object
 *       properties:
 *               projectName:
 *                 type: string
 */
const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler")
const projectController=require("../controllers/projectController")
/**
 * @swagger
 * /project/add:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project' 
 *     responses:
 *       '201':
 *         description: Project created successfully
 *       '400':
 *         description: Bad request
 */

router.post("/add",asyncHandler(projectController.createProject))
/**
 * @swagger
 * /project/fetchId:
 *   get:
 *     summary: Get projects by auth user
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '404':
 *         description: Project not found
 */
router.get("/fetchId",asyncHandler(projectController.getProject))
/**
 * @swagger
 * /project/get:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get("/get",asyncHandler(projectController.getAll))
/**
 * @swagger
 * /project/update/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Project]
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
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: Project updated successfully
 *       '404':
 *         description: Project not found
 */
router.put("/update/:id",asyncHandler(projectController.updateProject))
/**
 * @swagger
 * /project/delete/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Project]
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
 *         description: Project deleted successfully
 *       '404':
 *         description: Project not found
 */
router.delete("/delete/:id",asyncHandler(projectController.deleteProject))
module.exports = router;
