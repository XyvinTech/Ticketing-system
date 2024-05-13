const express = require("express");
const router = express.Router();
const adminRoutes = require("./routes/adminRoute");
const conversationRoutes = require("./routes/conversationRoute");
const userRoutes = require("./routes/userRoute");
const projectRoutes = require("./routes/projectRoute");
const ticketRoutes = require("./routes/ticketRoute");
const notificationRoutes = require("./routes/notificationRoute");
const authRoutes = require("./routes/authRoute");
const departmentRoutes = require("./routes/departmentRoute");
const verifyToken = require("./middlewares/verifyUser");
router.use("/admin", verifyToken, adminRoutes);
router.use("/conversation", verifyToken,conversationRoutes);
router.use("/user", verifyToken,userRoutes);
router.use("/project", verifyToken, projectRoutes);
router.use("/ticket", verifyToken, ticketRoutes);
router.use("/notification",verifyToken, notificationRoutes);
router.use("/auth", authRoutes);
router.use("/department", verifyToken, departmentRoutes);

//...
module.exports = router;
