const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/db'); // Import the connectDB function
const adminRoutes=require('./routes/adminRoute');
const conversationRoutes=require('./routes/conversationRoute');
const userRoutes = require('./routes/userRoute');
const projectRoutes=require('./routes/projectRoute');
const ticketRoutes=require('./routes/ticketRoute');
const notificationRoutes=require('./routes/notificationRoute');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
// Add your route handling here
app.use("/admin",adminRoutes);
app.use("/conversation",conversationRoutes);
app.use("/user",userRoutes);
app.use("/project",projectRoutes)
app.use("/ticket",ticketRoutes)
app.use("/notification",notificationRoutes)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
