"use strict";

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function filename(req, file, cb) {
    var fileNme = _path2.default.extname(file.originalname);
    cb(null, Date.now + fileNme);
  }
});

var upload = (0, _multer2.default)({
  storage: storage
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

module.exports = upload;