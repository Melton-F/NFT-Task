import NFT from '../model/nftModel'

import cron from 'node-cron'

import Bid from '../../Bid/BidModel/bidmodel'

exports.showNFTs = (req, res)=>{
    NFT.find()
        .populate("nftHolder", "name")
        .populate("nftCollection", "name")
        .then(NFTs=>{
            if(NFTs<1){
                return res.status(404).json({
                    status:"Fail",
                    message:"There is no NFTs",
                })
            }
            res.status(200).json({
                status:"Success",
                message:"All NFTs showed",
                no_Of_NFTs: NFTs.length,
                NFTs
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err.message
            })
        })
}

exports.createNFT = (req, res)=>{
    const nft = new NFT({
        name:req.body.name,
        description:req.body.description,
        nftCollection:req.body.nftCollection,
        nftHolder:req.body.nftHolder,
        status:req.body.status,
        price:req.body.price,
        isSold:req.body.isSold,
        saleType:req.body.saleType,
    })
    if(req.file){
        nft.nftImage = req.file.path
        console.log('file has in the req file');
    }
    if(req.files){
        let path =''
        // console.log(req.files);
        req.files.forEach((files, index, arr)=>{
            path = path+files.path+','
        })
        path = path.substring(0, path.lastIndexOf(','))
        nft.photo = path
    }

    nft.save().then((doc)=>{
        res.status(201).json({
            status:"Success",
            message:"NFT created",
            createdNFT:doc
        })
    })
    .catch(err=>{
        res.status(400).json({
            status:"Fail",
            error:err.message
        })
    })
}

exports.getNFTById = (req, res)=>{
    NFT.findById(req.params.id)
        .populate("nftHolder", "name")
        .then(nft=>{
            if(!nft){
                res.status(404).json({
                    status:"Fail",
                    message:"NFT not Found"
                })
            }
            res.status(200).json({
                status:"Success",
                nft
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err.message
            })
        })
}

exports.updateNFT = (req, res)=>{
    NFT.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(doc=>{
            res.status(200).json({
                status:"Success",
                message:"NFT updated",
                updatedNFT:doc
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"fail",
                error:err.message
            })
        })
}

exports.updateNftCollection = async (req, res)=>{
    try{
        const needUpdateField = await NFT.findById(req.params.id)
        let arrayField = needUpdateField.nftCollection
        console.log(arrayField)
        arrayField.push(req.body.nftCollection)

        NFT.findByIdAndUpdate(req.params.id, {nftCollection:arrayField}, {new:true})
            .then(updatedField=>{
                res.status(200).json({
                    message:"updated",
                    updatedField
                })
            })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

exports.ShowTheNFTCollection = (req, res)=>{
    NFT.find({nftCollection:req.params.id})
        .then(result=>{
            if(result<1){
                return res.status(400).json({
                    message:"Sorry Collection not found"
                })
            }
            res.status(200).json({
                message:"NFTs showed for the passed collection",
                No_Of_NFT:result.length,
                result
            })
        })
        .catch(e=>{
            res.status(400).json({
                error:e.message
            })
        })
}

exports.userHavingNFTs = (req, res)=>{
    NFT.find({nftHolder:req.params.id})
        // .populate()
        .then(result=>{
            if(result<1){
                return res.status(400).json({
                    message:"Sorry NFTs not found for the User"
                })
            }
            res.status(200).json({
                message:"user's NFTs shown",
                count_of_usersNFT:result.length,
                NFTs_Own_By_User:result
            })
        })
        .catch(e=>{
            res.status(400).json({
                error:e.message
            })
        })
}

exports.forSale = (req, res)=>{
    const forSale = req.body.forSale
    if(forSale==1){
        NFT.findByIdAndUpdate(req.params.id,{forSale:1}, {new:true})
            .then(result=>{
                res.status(200).json({
                    forSaleUpdated:result
                })
            })
            .catch(e=>{
                res.json({
                    error:e.message
                })
            })
    }
}

exports.showSaleNFTs = (req, res)=>{
    NFT.find({forSale:1})
        .populate("nftHolder", "name")
        .then(result=>{
            if(result<1){
                return res.status(200).json({
                    message:"No NFTs are for sale"
                })
            }
            res.status(200).json({
                count:result.length,
                NFTs_For_Sale:result
            })
        })
        .catch(e=>{
            res.status(200).json({
                error:e.message
            })
        })
}

exports.showSaleTypeBuyNFTs = async(req, res)=>{
    try{
        const show = await NFT.find({saleType:"Buy"})
        res.status(200).json({
            show
        })
    }
    catch(e){
        res.send(e)
    }
    // NFT.find({saleType:"Bid"})
    //     .then(result=>{
    //         if(result<1){
    //            return res.send("No data")
    //         }
    //         res.send(result)
    //     })
    //     .catch(e=>{
    //         res.send(e)
    //     })
}

exports.buyNft = (req, res)=>{
    NFT.findById(req.params.id)
        .then(nft=>{
            if(!nft){
                res.status(404).json({
                    message:"NFT not fpoound"
                })
            }
            else if(nft){
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
                    .catch(e=>{
                        res.send(e.message)
                    })
            }
        })
        .catch(e=>{
            res.status(400).json({
                error:e.message
            })
        })
}

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

exports.bidNFTv2 = (req, res)=>{
    const bid = new Bid({
        nftId:req.body.nftId,
        bidder:req.body.bidder,
        bidPrice:req.body.bidPrice
    })
    bid.save()
        .then(doc=>{
            res.status(200).json({
                message:"Thanks for the bidding, Please wait untill the final bid"
            })
        })
        .catch(err=>{
            res.status(400).json({
                erro:err.message
            })
        })
}

exports.showHighestBid = async(req, res)=>{
    try{
        const bid = await Bid.find({nftId:req.body.nftId}).sort({bidPrice:-1}).exec()
        let highest_bid = bid[0]
        res.status(200).json({
            highest_bid
        })
    }
    catch(e){
        res.send(e.message)
    }    
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

exports.deleteNFT = (req, res)=>{
    NFT.deleteOne({_id:req.params.id})
        .exec()
        .then(result=>{
            res.status(204).json({
                status:"Success",
                message:"NFT deleted successfully"
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err.message
            })
        })
}