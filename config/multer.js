const multer = require("multer");

const storage = multer.memoryStorage(); 

const filter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: filter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

module.exports = upload;
