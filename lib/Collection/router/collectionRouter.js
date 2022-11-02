'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _collectionController = require('../controller/collectionController');

var _collectionController2 = _interopRequireDefault(_collectionController);

var _upload = require('../../middleware/upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_collectionController2.default.showCollections).post(_upload2.default.single("collectionImage"), _collectionController2.default.createCollection);

router.route('/:id').get(_collectionController2.default.getCollectionById).patch(_collectionController2.default.updateCollectionById).delete(_collectionController2.default.deleteCollectionById);

module.exports = router;