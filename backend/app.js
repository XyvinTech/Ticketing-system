const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require('path')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swaggerConfig");
const connectDB = require("./db/db");
const AllRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const upload = require("./utils/multerConfig");
const uploadController = require("./controllers/uploadController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();
app.use(express.static(path.join(__dirname, 'build')))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", AllRoutes);

app.use(errorHandler);

const asyncHandler = require("./utils/asyncHandler");
const verifyToken = require("./middlewares/verifyUser");

app.post(
  "/upload",
  upload.array("attachments"),
  verifyToken,
  asyncHandler(uploadController.uploadImage)
);



app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'build','index.html'))
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
