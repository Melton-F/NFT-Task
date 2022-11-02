import User from "../model/userModel"

exports.showUsers = (req, res)=>{
    User.find()
        // .populate("books","bookName")
        .then(users=>{
            if(users<1){
                return res.status(404).json({
                    status:"Fail",
                    message:"There is no users",
                })
            }
            res.status(200).json({
                status:"Success",
                message:"All the users showed",
                no_Of_Users: users.length,
                users
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

exports.createUser = (req, res)=>{
    const user = new User({
        name:req.body.name,
        walletAddress:req.body.walletAddress,
        email:req.body.email,
        // profilePhoto:req.body.profilePhoto,
        status:req.body.status
    })

    user.save().then((doc)=>{
        res.status(201).json({
            status:"Success",
            message:"user created",
            createdUser:doc
        })
    })
    .catch(err=>{
        res.status(400).json({
            status:"Fail",
            error:err
        })
    })
}

exports.getUserById = (req, res)=>{
    User.findById(req.params.id)
        .then(user=>{
            if(!user){
                res.status(404).json({
                    status:"Fail",
                    message:"User not Found"
                })
            }
            res.status(200).json({
                status:"Success",
                user
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

exports.updateUser = (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(doc=>{
            res.status(200).json({
                status:"Success",
                message:"user updated",
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


exports.deleteUser = (req, res)=>{
    User.deleteOne({_id:req.params.id})
        .exec()
        .then(result=>{
            res.status(204).json({
                status:"Success",
                message:"user deleted successfully"
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}
