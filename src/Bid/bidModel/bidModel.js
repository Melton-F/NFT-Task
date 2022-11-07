import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  nftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NFT",
    required: true,
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bidPrice: { type: Number },
});

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
