"use strict";

var _nftModel = require("../model/nftModel");

var _nftModel2 = _interopRequireDefault(_nftModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.showNFTs = function (req, res) {
    _nftModel2.default.find()
    // .populate("books","bookName")
    .then(function (NFTs) {
        if (NFTs < 1) {
            return res.status(404).json({
                status: "Fail",
                message: "There is no NFTs"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "All NFTs showed",
            no_Of_NFTs: NFTs.length,
            NFTs: NFTs
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err.message
        });
    });
};

exports.createNFT = function (req, res) {
    var nft = new _nftModel2.default({
        name: req.body.name,
        description: req.body.description,
        nftCollection: req.body.nftCollection,
        status: req.body.status,
        price: req.body.price,
        isSold: req.body.isSold,
        saleType: req.body.saleType
    });
    if (req.file) {
        nft.nftImage = req.file.path;
        console.log('file has in the req file');
    }
    if (req.files) {
        var path = '';
        // console.log(req.files);
        req.files.forEach(function (files, index, arr) {
            path = path + files.path + ',';
        });
        path = path.substring(0, path.lastIndexOf(','));
        nft.photo = path;
    }

    nft.save().then(function (doc) {
        res.status(201).json({
            status: "Success",
            message: "NFT created",
            createdNFT: doc
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err.message
        });
    });
};

exports.getNFTById = function (req, res) {
    _nftModel2.default.findById(req.params.id).then(function (nft) {
        if (!nft) {
            res.status(404).json({
                status: "Fail",
                message: "NFT not Found"
            });
        }
        res.status(200).json({
            status: "Success",
            nft: nft
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err.message
        });
    });
};

exports.updateNFT = function (req, res) {
    _nftModel2.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (doc) {
        res.status(200).json({
            status: "Success",
            message: "NFT updated",
            updatedNFT: doc
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "fail",
            error: err.message
        });
    });
};

exports.updateNftCollection = async function (req, res) {
    try {
        var needUpdateField = await _nftModel2.default.findById(req.params.id);
        var arrayField = needUpdateField.nftCollection;
        console.log(arrayField);
        arrayField.push(req.body.nftCollection);

        _nftModel2.default.findByIdAndUpdate(req.params.id, { nftCollection: arrayField }, { new: true }).then(function (updatedField) {
            res.status(200).json({
                message: "updated",
                updatedField: updatedField
            });
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

exports.deleteNFT = function (req, res) {
    _nftModel2.default.deleteOne({ _id: req.params.id }).exec().then(function (result) {
        res.status(204).json({
            status: "Success",
            message: "NFT deleted successfully"
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err.message
        });
    });
};