let express = require("express");
let router = express.Router();
let {requiredUserAuthen} = require('./../../middleware/authen.middleware');
let {CreateNewProfile,UpdateProfile} = require('./profiles.validation');
const { validate } = require('express-validation');
const User = require('./../../models/user');
const Profile = require('./../../models/profiles');
let {responsHelper} = require('./../../common/responseHelper');
router.post("/create-profile",
    validate(CreateNewProfile),
    requiredUserAuthen,
    async(req,res)=>{
        try {
            let user = await User.findById(req.user._id);
            console.log(user);
            if(user.role!=2){
                return responsHelper(req,res,'not permission',null,402);
            }
            console.log(req.body);
            const countNumberProfile  = await Profile.countDocuments({user:user._id});
            if(countNumberProfile>0){
                return responsHelper(req,res,'exits profile',null,405);
            }
            let profileCreate = await Profile.create({
                user:user._id,
                ...req.body
            })
            return responsHelper(req,res,null,profileCreate);
        } catch (error) {
            return responsHelper(req,res,error);
        }
    }
)
router.get("/get-profile",requiredUserAuthen,async(req,res)=>{
    try {
        let profileUser = await Profile.findOne({user:req.user._id});
        return responsHelper(req,res,null,profileUser);
    } catch (error) {
        return responsHelper(req,res,error);
    }
})
router.post("/update-profile",requiredUserAuthen,validate(UpdateProfile),async(req,res)=>{
    try {
        let {id} = req.body;
        let dataBody = req.body ;
        delete dataBody.id ;
        let profile = await Profile.findByIdAndUpdate(id,{...dataBody},{new:true});
        return responsHelper(req,res,null,profile);
    } catch (error) {
        return responsHelper(req,res,error);
    }
})
router.get("/get-profile/:id",
    async(req,res)=>{
    try {
        let idProfile = req.params.id ;
        let profile = await Profile.findById(idProfile);
        return responsHelper(req,res,null,profile);
    } catch (error) {
        return responsHelper(req,res,error);
    }
})
router.get("/list-profile",
    async(req,res)=>{
        try {
            let listProfile = await Profile.find({}).sort({createdAt:-1})
            return responsHelper(req,res,null,listProfile);
        } catch (error) {
            return responsHelper(req,res,error);
        }
    })

module.exports = router ;
