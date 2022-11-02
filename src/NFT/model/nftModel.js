import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: { type: String },
  nftImage: { type: String },
  nftCollection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
  ],
  status: { type: Boolean },
  price: { type: Number },
  isSold: { type: Boolean },
  saleType: {
    type: String,
    enum: ["Buy", "Bid"],
  },
  nftHolder:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
}
});

const NFT = mongoose.model("NFT", nftSchema);
module.exports = NFT;
