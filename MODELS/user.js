const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    email: {type:String, required:true},
    city:{type:String, required:true},
    profileImage:{type:String},
    status:{type:Boolean, default:true}
}, {collection: 'usercollection'})




const userModel = mongoose.model("user",userSchema)


module.exports = userModel