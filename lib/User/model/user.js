"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    name: { type: String },
    walletAddress: { type: String },
    email: { type: String },
    profilePhoto: { type: String },
    status: { type: Boolean }
});

exports.User = _mongoose2.default.model("User", userSchema);