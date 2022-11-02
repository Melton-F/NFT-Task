import Collection from '../model/collectionModel'

exports.showCollections = (req, res)=>{
    Collection.find()
    .then(collection=>{
        if(collection<1){
            return res.status(404).json({
                status:"Fail",
                message:"There is no collection",
            })
        }
        res.status(200).json({
            status:"Success",
            message:"All collectionsshowed",
            no_Of_Collections: collection.length,
            collection
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({
            status:"Fail",
            error:err.message
        })
    })
}

exports.createCollection = (req, res)=>{
    const collection = new Collection({
        name:req.body.name,
        creatorName:req.body.creatorName,
        status:req.body.status,
        attributes:req.body.attributes,
        userHolder:req.body.userHolder
    })

    if(req.file){
        collection.collectionImage = req.file.path
        console.log('file has in the req file');
    }
    if(req.files){
        let path =''
        // console.log(req.files);
        req.files.forEach((files, index, arr)=>{
            path = path+files.path+','
        })
        path = path.substring(0, path.lastIndexOf(','))
        collection.collectionImage = path
    }

    collection.save().then((doc)=>{
        res.status(201).json({
            status:"Success",
            message:"collection created",
            created_collection:doc
        })
    })
    .catch(err=>{
        res.status(400).json({
            status:"Fail",
            error:err
        })
    })
}

exports.getCollectionById = (req, res)=>{
    Collection.findById(req.params.id)
        .then(collection=>{
            if(!collection){
                res.status(404).json({
                    status:"Fail",
                    message:"collection not Found"
                })
            }
            res.status(200).json({
                status:"Success",
                collection
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

exports.updateCollectionById = (req, res)=>{
    Collection.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(doc=>{
            res.status(200).json({
                status:"Success",
                message:"Collection updated",
                updatedUser:doc
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"fail",
                error:err
            })
        })
}

exports.collectionsInUser = (req, res)=>{
    Collection.find({userHolder:req.params.id})
        .then(result=>{
            res.status(200).json({
                message:"collections hold by user are..",
                count:result.length,
                collection:result
            })
        })
}

exports.deleteCollectionById = (req, res)=>{
    Collection.deleteOne({_id:req.params.id})
        .exec()
        .then(result=>{
            res.status(204).json({
                status:"Success",
                message:"Collection deleted successfully"
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}