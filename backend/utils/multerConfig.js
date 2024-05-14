const multer = require("multer");
const fileSizeLimit = 30 * 1024 * 1024; // 30 MB in bytes

// Define a storage strategy for multer
const storage = multer.memoryStorage();
//~ Define a filter function for multer file uploads
const filter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "video/mp4",
    "video/x-matroska", // For MKV files
    "video/x-msvideo", // For AVI files
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type, only JPEG, PNG, PDF, MP4, AVI, and MKV are allowed!"
      ),
      false
    );
  }
};

//~ Create a multer instance with the defined filter
const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: { fileSize: fileSizeLimit },
});

module.exports = upload;
