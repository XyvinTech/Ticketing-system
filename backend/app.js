const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/db");
const AllRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();
app.use("/", AllRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
