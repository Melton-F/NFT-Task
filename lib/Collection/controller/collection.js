"use strict";

var _collectionModel = require("../model/collectionModel");

var _collectionModel2 = _interopRequireDefault(_collectionModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.showCollections = function (req, res) {
    _collectionModel2.default.find()
    // .populate("books","bookName")
    .then(function (collection) {
        if (collection < 1) {
            return res.status(404).json({
                status: "Fail",
                message: "There is no collection"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "All collectionsshowed",
            no_Of_Collections: collection.length,
            users: users
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

exports.createCollection = function (req, res) {
    var collection = new _collectionModel2.default({
        name: req.body.name,
        creatorName: req.body.creatorName,
        status: req.body.status,
        attributes: req.body.attributes
    });

    collection.save().then(function (doc) {
        res.status(201).json({
            status: "Success",
            message: "collection created",
            created_collection: doc
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

exports.getCollectionById = function (req, res) {
    _collectionModel2.default.findById(req.params.id).then(function (collection) {
        if (!collection) {
            res.status(404).json({
                status: "Fail",
                message: "collection not Found"
            });
        }
        res.status(200).json({
            status: "Success",
            collection: collection
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

exports.updateCollectionById = function (req, res) {
    _collectionModel2.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (doc) {
        res.status(200).json({
            status: "Success",
            message: "Collection updated",
            updatedUser: doc
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "fail",
            error: err
        });
    });
};

exports.deleteCollectionById = function (req, res) {
    _collectionModel2.default.deleteOne({ _id: req.params.id }).exec().then(function (result) {
        res.status(204).json({
            status: "Success",
            message: "Collection deleted successfully"
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};