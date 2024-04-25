const express = require("express");
const router = express.Router();
const adminRoutes = require("./routes/adminRoute");
const conversationRoutes = require("./routes/conversationRoute");
const userRoutes = require("./routes/userRoute");
const projectRoutes = require("./routes/projectRoute");
const ticketRoutes = require("./routes/ticketRoute");
const notificationRoutes = require("./routes/notificationRoute");
const authRoutes = require("./routes/authRoute");
router.use("/admin", adminRoutes);
router.use("/conversation", conversationRoutes);
router.use("/user", userRoutes);
router.use("/project", projectRoutes);
router.use("/ticket", ticketRoutes);
router.use("/notification", notificationRoutes);
router.use("/auth", authRoutes);

module.exports = router;
