const multer = require("multer");
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
module.exports=upload;