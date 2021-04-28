const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
//data field
    email: {type:String, require:true}, 
    password: {type: String, require: true},
    name:{
        type:String,
        default:"Nail"
    },
    role:{
        type:Number,
        default:1
        // Role 1 : Normal User
        // Role 2 : NailTech  
        // Role 3 : Supper Admin
    },
    avatar:{
        type:String
    }
},{timestamps:true})
//create model
const User = mongoose.model("user", userSchema);


// export User
module.exports = User;



