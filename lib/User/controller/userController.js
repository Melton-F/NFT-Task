"use strict";

var _userModel = require("../model/userModel");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.showUsers = function (req, res) {
    _userModel2.default.find()
    // .populate("books","bookName")
    .then(function (users) {
        if (users < 1) {
            return res.status(404).json({
                status: "Fail",
                message: "There is no users"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "All the users showed",
            no_Of_Users: users.length,
            users: users
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

exports.createUser = function (req, res) {
    var user = new _userModel2.default({
        name: req.body.name,
        walletAddress: req.body.walletAddress,
        email: req.body.email,
        // profilePhoto:req.body.profilePhoto,
        status: req.body.status
    });

    user.save().then(function (doc) {
        res.status(201).json({
            status: "Success",
            message: "user created",
            createdUser: doc
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

exports.getUserById = function (req, res) {
    _userModel2.default.findById(req.params.id).then(function (user) {
        if (!user) {
            res.status(404).json({
                status: "Fail",
                message: "User not Found"
            });
        }
        res.status(200).json({
            status: "Success",
            user: user
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

exports.updateUser = function (req, res) {
    _userModel2.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (doc) {
        res.status(200).json({
            status: "Success",
            message: "user updated",
            updatedUser: doc
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "fail",
            error: err
        });
    });
};

exports.deleteUser = function (req, res) {
    _userModel2.default.deleteOne({ _id: req.params.id }).exec().then(function (result) {
        res.status(204).json({
            status: "Success",
            message: "user deleted successfully"
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};