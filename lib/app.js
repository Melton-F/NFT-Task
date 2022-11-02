"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _collectionRouter = require("./Collection/router/collectionRouter");

var _collectionRouter2 = _interopRequireDefault(_collectionRouter);

var _nftRouter = require("./NFT/router/nftRouter");

var _nftRouter2 = _interopRequireDefault(_nftRouter);

var _userRouter = require("./User/router/userRouter");

var _userRouter2 = _interopRequireDefault(_userRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use((0, _morgan2.default)("dev"));
app.use('/uploads', _express2.default.static('uploads'));

app.use('/api/collection', _collectionRouter2.default);
app.use('/api/nft', _nftRouter2.default), app.use('/api/user', _userRouter2.default);

module.exports = app;