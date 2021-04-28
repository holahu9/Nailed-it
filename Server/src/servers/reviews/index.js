let express = require('express');
let router = express.Router();
const { validate } = require('express-validation');
const User = require('./../../models/user');
const Profile = require('./../../models/profiles');
const Review = require('./../../models/review');
let {responsHelper} = require('./../../common/responseHelper');
let {CreateNewReviews,GetListReviews,UpdateReviews,DeleteReviews} = require('./reviews.validation');
let {requiredUserAuthen} = require('./../../middleware/authen.middleware');
router.post('/create-review',
    validate(CreateNewReviews),
    requiredUserAuthen,
    async(req,res)=>{
    try {
        let profile = await Profile.findById(req.body.profile);
        if(!profile){
            return responsHelper(req,res,'profile not found',null,402);
        }
        let countReivews = await Review.countDocuments({
            profile:req.body.profile,
            user:req.user._id
        })
        if(countReivews>0){
            return responsHelper(req,res,'you are reivewd',null,405);
        }
        const reviews = await Review.create({
            user:req.user._id,
            ...req.body
        })
        const listReviewsProfile = await Review.find({
            profile:req.body.profile
        })
        let sumStart =0 ;
        listReviewsProfile.forEach((item)=>sumStart+=item.star);
        let startAvg = (sumStart/listReviewsProfile.length).toFixed(1);
        console.log(startAvg);
        await Profile.findByIdAndUpdate(req.body.profile,{
            reviews_number:listReviewsProfile.length,
            star_rate:startAvg
        })
        return responsHelper(req,res,null,reviews);
    } catch (error) {
        return responsHelper(req,res,error);
    }
})
router.post("/list-review",
    validate(GetListReviews),
    async(req,res)=>{
        try {
            let listReviews = await Review.find({
                profile:req.body.profile
            }).sort({createAt:-1}).populate({
                path:"user",
                select:{name:1}
            })
            return responsHelper(req,res,null,listReviews);
        } catch (error) {
            return responsHelper(req,res,error);
        }
    }
)
router.post("/review-of-user",
    requiredUserAuthen,
    validate(GetListReviews),
    async(req,res)=>{
        try {
            let listReviews = await Review.findOne({
                profile:req.body.profile,
                user:req.user._id
            })
            return responsHelper(req,res,null,listReviews);
        } catch (error) {
            return responsHelper(req,res,error);
        }
    }
)
router.post("/update-review",
    requiredUserAuthen,
    validate(UpdateReviews),
    async(req,res)=>{
        try {
            let {id} = req.body ;
            let dataUpdate = req.body ;
            delete dataUpdate.id ;
            let resultUpdate = await Review.findByIdAndUpdate(id,{...dataUpdate},{new:true});
            const listReviewsProfile = await Review.find({
                profile:resultUpdate.profile
            })
            let sumStart =0 ;
            listReviewsProfile.forEach((item)=>sumStart+=item.star);
            let startAvg = (sumStart/listReviewsProfile.length).toFixed(1);
            await Profile.findByIdAndUpdate(resultUpdate.profile,{
                reviews_number:listReviewsProfile.length,
                star_rate:startAvg
            })
            return responsHelper(req,res,null,resultUpdate);
        } catch (error) {
            return responsHelper(req,res,error);
        }
    }
)
router.post("/delete-review",
    requiredUserAuthen,
    validate(DeleteReviews),
    async(req,res)=>{
        let reviews = await Review.findById(req.body.id);
        if(!reviews){
            return responsHelper(req,res,"not found");
        }
        if(reviews.user!= req.user._id){
            return responsHelper(req,res,"not permission");
        }
        let profile_id = reviews.profile ;
        await reviews.remove();
        const listReviewsProfile = await Review.find({
            profile:profile_id
        })
        if(listReviewsProfile.length==0){
            await Profile.findByIdAndUpdate(profile_id,{
                reviews_number:listReviewsProfile.length,
                star_rate:3
            })
        }
        else {
            let sumStart =0 ;
            listReviewsProfile.forEach((item)=>sumStart+=item.star);
            let startAvg = (sumStart/listReviewsProfile.length).toFixed(1);
            await Profile.findByIdAndUpdate(resultUpdate.profile,{
                reviews_number:listReviewsProfile.length,
                star_rate:startAvg
            })
        }
        return responsHelper(req,res,null,"success");
        }
    )
module.exports = router;