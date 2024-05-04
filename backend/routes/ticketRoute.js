/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Ticket-related endpoints
 * security:
 *   - bearerAuth: []
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         ticket_Id:
 *           type: string
 *         priority:
 *           type: string
 *         department:
 *           type: string
 *         subject:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, progress, completed, deleted]
 *         attachment:
 *           type: array
 *           items:
 *             type: string
 *         projectId:
 *           type: string
 *         assignedTo:
 *           type: string
 *         reporter:
 *           type: string
 *       required:
 *         - priority
 *         - department
 *         - subject
 *         - description
 *         - status
 */
const express = require("express");

const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const ticketController = require("../controllers/ticketController");
/**
 * @swagger
 * /ticket/add:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '201':
 *         description: Ticket created successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/add", asyncHandler(ticketController.createTicket));
/**
 * @swagger
 * /ticket/get:
 *   get:
 *     summary: Get all tickets
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: Search by ticket subject
 *       - in: query
 *         name: inStatus
 *         schema:
 *           type: string
 *         description: Filter by ticket status
 *       - in: query
 *         name: inDep
 *         schema:
 *           type: string
 *         description: Filter by department ID
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */
router.get("/get", asyncHandler(ticketController.getAll));
/**
 * @swagger
 * /ticket/get/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Ticket]
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
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '400':
 *         description: Invalid ticket ID
 *       '404':
 *         description: Ticket not found
 */

router.get("/get/:id", asyncHandler(ticketController.getTicket));
router.put("/update/:id", asyncHandler(ticketController.updateTicket));
router.delete("/delete/:id", asyncHandler(ticketController.deleteTicket));
module.exports = router;
