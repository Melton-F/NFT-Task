'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controller/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//Routers
router.route('/').get(_userController2.default.showUsers).post(_userController2.default.createUser);

router.route('/:id').get(_userController2.default.getUserById).delete(_userController2.default.deleteUser).patch(_userController2.default.updateUser);

module.exports = router;