const mongoose = require("mongoose");
const reviewsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profile'
    },
    star:{
        type:Number,
        default:3
    },
    comment:{
        type:String
    }
},{timestamps:true})
//create model
const Review = mongoose.model("review", reviewsSchema);
// export User
module.exports = Review;



