const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/db");
const AllRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const uploadController = require("./controllers/uploadController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();
app.use("/", AllRoutes);

app.use(errorHandler);
app.use("/uploads", express.static("uploads"));

const multer = require("multer");
const asyncHandler = require("./utils/asyncHandler");
const verifyToken = require("./middlewares/verifyUser");

//~ Define a filter function for multer file uploads
const filter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG, PNG and PDF is allowed!"), false);
  }
};
//~ Create a multer instance with the defined filter
const upload = multer({ fileFilter: filter });

app.post(
  "/upload",
  upload.array("attachments"),
  verifyToken,
  asyncHandler(uploadController.uploadImage)
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
