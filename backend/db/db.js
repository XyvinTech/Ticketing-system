const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URL || 'mongodb+srv://anjanavu2000:anjana2000@cluster0.trc3jzo.mongodb.net/support?retryWrites=true&w=majority/ticketing_system'
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

module.exports = connectDB;
