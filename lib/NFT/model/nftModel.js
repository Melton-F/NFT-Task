"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nftSchema = new _mongoose2.default.Schema({
  name: {
    type: String
  },
  description: { type: String },
  nftImage: { type: String },
  nftCollection: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Collection",
    required: true
  }],
  status: { type: Boolean },
  price: { type: Number },
  isSold: { type: Boolean },
  saleType: {
    type: String,
    enum: ["Buy", "Bid"]
  }
});

var NFT = _mongoose2.default.model("NFT", nftSchema);
module.exports = NFT;