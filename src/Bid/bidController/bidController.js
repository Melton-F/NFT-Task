import Bid from "../../Bid/bidModel/bidModel";
import NFT from "../../NFT/model/nftModel";

import cron from "node-cron";

// exports.bidNFT = async (req, res)=>{
//     try{
//         let highestPrice= [];
//         const NFTOriginalValue = req.body.NFTActualPrice
//         let lastUser = req.params.id
//         let lastPrice = req.body.bidPrice

//         if(NFTOriginalValue<lastPrice){
//             highestPrice.push(lastPrice)
//             let final = Math.max(...highestPrice)
//             let highestBidder = lastUser
//             console.log(`highest bid is : ${final}`)
//             console.log(`Highest bidder is : ${highestBidder}`)
//         }

//         const timerFunction = cron.schedule("")

//         res.status(200).json({
//             message:"Thanks for the bidding, Please bid next"
//         })
//     }
//     catch(e){
//         res.status(400).json({
//             error:e.message
//         })
//     }
// }

exports.bidNFTv2 = (req, res) => {
  const bid = new Bid({
    nftId: req.body.nftId,
    bidder: req.body.bidder,
    bidPrice: req.body.bidPrice,
  });
  bid
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Thanks for the bidding, Please wait untill the final bid",
      });
    })
    .catch((err) => {
      res.status(400).json({
        erro: err.message,
      });
    });
};

// exports.showHighestBid = async(req, res)=>{
//     try{
//         const bid = await Bid.find({nftId:req.body.nftId}).sort({bidPrice:-1}).exec()
//         let highest_bid = bid[0]
//         res.status(200).json({
//             highest_bid:highest_bid
//         })
//     }
//     catch(e){
//         res.send(e.message)
//     }
// }

async function confirmBidByCronJob() {
  try {
    console.log("inside the cron function")
    const nft = await NFT.find({
      saleType: "Bid",
      isSold: false,
    }).exec();
    console.log(nft)
    if(nft<1){
        console.log("there is no nft")
    }
    else{
        nft.forEach(async (item, index) => {
            console.log("inside the forEach function")
          let bid = await Bid.find({ nftId: item._id })
            .sort({ bidPrice: -1 })
            .exec();
            console.log(bid.length)
          if (bid.length > 0) {
            console.log("bid length is not equal to zero")
            let highest_bid = bid[0];
            let id = highest_bid.nftId;
            let updates = { nftHolder: highest_bid.bidder, isSold: true };
            let options = { new: true };
            console.log(`highest bid : ${highest_bid}`);
            console.log(`id : ${id}`);
            console.log(`highest_bid.bidder : ${highest_bid.bidder}`)
        
    
            let updatedNFT = await NFT.findByIdAndUpdate(
              id,
              updates,
              options
            ).exec();

            console.log(`updated nft is: ${updatedNFT}`)
    
            if (updatedNFT) {
              console.log(`highest bid for ${updatedNFT.name}`);
            } else {
              console.log(`highest bid failed for ${item.name}`);
            }
          }
        });
    }
  } catch (error) {
    console.log(error);
  }
}

confirmBidByCronJob();

exports.cornTaskedBid = cron.schedule('* */1 * * * ', ()=>{
        confirmBidByCronJob()
})


exports.showHighestBid = (req, res) => {
  Bid.find({ nftId: req.body.nftId })
    .sort({ bidPrice: -1 })
    .then((bid) => {
      let highest_bid = bid[0];
      res.status(200).json({
        highest_bid: highest_bid,
      });
    })
    .catch((e) => e.message);
};

exports.confirmBid = (req, res) => {
  NFT.findById(req.params.id)
    .then((nft) => {
      if (!nft) {
        return res.status(404).json({
          message: "nft not found",
        });
      }
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      NFT.findByIdAndUpdate(id, updates, options).then((updatedNFT) => {
        res.status(200).json({
          message: `NFT has been sold to : ${req.body.nftHolder}`,
          theNFT: updatedNFT,
        });
      });
    })
    .catch((e) => {
      res.status(400).json({
        error: e.message,
      });
    });
};
