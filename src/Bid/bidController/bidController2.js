import Bid from '../../Bid/bidModel/bidModel'
import cron from 'node-cron'


exports.bidNFTv2 = (req, res)=>{
    console.log("its in the bidNFTv2 func")
    const bid = new Bid({
        nftId:req.body.nftId,
        bidder:req.body.bidder,
        bidPrice:req.body.bidPrice
    })
    bid.save()
        .then(doc=>{
            Bid.find({nftId:req.body.nftId}).sort({bidPrice:-1})
                .then(bid=>{
                    
                })
        })
        .catch(err=>{
            res.status(400).json({
                erro:err.message
            })
        })
}



exports.showHighestBid = (req, res)=>{
    Bid.find({nftId:req.body.nftId}).sort({bidPrice:-1})
        .then(bid=>{
           let highest_bid = bid[0]
           res.status(200).json({
            highest_bid:highest_bid
           })
        })
        .catch(e=>e.message)
}

exports.confirmBid = (req, res)=>{
    NFT.findById(req.params.id)
        .then(nft=>{
            if(!nft){
                return res.status(404).json({
                    message:"nft not found"
                })
            }
            const id = req.params.id
            const updates = req.body
            const options = {new: true}

            NFT.findByIdAndUpdate(id, updates, options)
                .then(updatedNFT=>{
                    res.status(200).json({
                        message:`NFT has been sold to : ${req.body.nftHolder}`,
                        theNFT:updatedNFT
                    })
                })
        })
        .catch(e=>{
            res.status(400).json({
                error:e.message
            })
        })
}

// exports.cornTaskedBid = (req, res)=>{
//  cron.schedule('* * * * * * ', ()=>{
//     bidNFTv2()
// })
// }

// setTimeout(()=>{
//     cornTaskedBid.stop()
// }, 5000)