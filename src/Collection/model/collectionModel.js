import mongoose, { Mongoose } from "mongoose";

const collectionSchema = new mongoose.Schema({
    name:{type:String},
    creatorName:{type:String},
    collectionImage:{type:String},
    status:{type:Boolean},
    attributes:{type:Object},
    userHolder:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection