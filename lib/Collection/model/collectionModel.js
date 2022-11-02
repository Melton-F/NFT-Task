"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collectionSchema = new _mongoose2.default.Schema({
    name: { type: String },
    creatorName: { type: String },
    collectionImage: { type: String },
    status: { type: Boolean },
    attributes: { type: Object }

});

var Collection = _mongoose2.default.model("Collection", collectionSchema);

module.exports = Collection;