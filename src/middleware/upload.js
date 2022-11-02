import path from "path"
import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    let fileNme = path.extname(file.originalname);
    cb(null, Date.now + fileNme);
  },
});

const upload = multer({
  storage: storage,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
});

module.exports = upload