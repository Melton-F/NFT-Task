'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nftController = require('../controller/nftController');

var _nftController2 = _interopRequireDefault(_nftController);

var _upload = require('../../middleware/upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_nftController2.default.showNFTs).post(_upload2.default.single('nftImage'), _nftController2.default.createNFT).post(_nftController2.default.createNFT);

router.post('/multiple', _upload2.default.array('nftImage'), _nftController2.default.createNFT);
router.route('/updateNFT/:id').patch(_nftController2.default.updateNftCollection);

router.route('/:id').get(_nftController2.default.getNFTById).patch(_nftController2.default.updateNFT).delete(_nftController2.default.deleteNFT);

module.exports = router;