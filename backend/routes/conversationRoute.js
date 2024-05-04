/**
 * @swagger
 * tags:
 *   name: Conversation
 *   description: Conversation-related endpoints
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         ticketId:
 *           type: string
 *         senderId:
 *           type: string
 *         message:
 *           type: string
 *         attachment:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - ticketId
 *         - message
 */
const express = require("express");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const conversationController = require("../controllers/conversationController");
/**
 * @swagger
 * /conversation/add:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conversation'
 *     responses:
 *       '201':
 *         description: Conversation created successfully
 *       '500':
 *         description: Internal server error
 */
router.post("/add", asyncHandler(conversationController.createConversation));
router.get("/get", asyncHandler(conversationController.getAll));
/**
 * @swagger
 * /conversation/fetch/{id}:
 *   get:
 *     summary: Get all conversations by ticket ID
 *     tags: [Conversation]
*     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 *       '400':
 *         description: Invalid ticket ID
 *       '404':
 *         description: Conversations not found
 */

router.get("/fetch/:id", asyncHandler(conversationController.getAllByTicketId));
router.get("/get/:id", asyncHandler(conversationController.getConversation));
router.put(
  "/update/:id",
  asyncHandler(conversationController.updateConversation)
);
router.delete(
  "/delete/:id",
  asyncHandler(conversationController.deleteConversation)
);
module.exports = router;
