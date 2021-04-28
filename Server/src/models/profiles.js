const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:String,
    phone:String,
    image:String,
    images:[String],
    salon_name:String,
    website:String,
    reviews_number:{
        type:Number,
        default:0
    },
    star_rate:{
        type:Number,
        default:5
    }
},{timestamps:true})
const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;



