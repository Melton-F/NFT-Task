import NFT from '../model/nftModel'

exports.showNFTs = (req, res)=>{
    NFT.find()
        // .populate("books","bookName")
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