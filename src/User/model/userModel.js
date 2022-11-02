import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String},
    walletAddress:{type:String},
    email:{type:String},
    profilePhoto:{type:String},
    status:{type:Boolean}
})

const User = mongoose.model("User", userSchema)

module.exports = User