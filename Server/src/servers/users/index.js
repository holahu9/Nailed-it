let express = require('express');
require("dotenv").config();
let router = express.Router();
const User  = require('./../../models/user');
let {responsHelper} = require('./../../common/responseHelper');
const { validate } = require('express-validation');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let {registerValidation,loginValidation} = require('./user.validation');

router.get("/",(req,res)=>{
    res.send("Phong");
})
router.post("/register",
    validate(registerValidation),
    async(req,res)=>{
        const {email, password,role,name} = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) {
        return responsHelper(req,res,'user is exits');
        }
        const salt = await bcrypt.genSalt(5);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password:passwordHash,
            role:role,
            name:name
        });
        await newUser.save();
        return responsHelper(req,res,null,newUser);
    })
router.post("/login", 
    validate(loginValidation),
    async (req, res) => {
    try {
        const { email, password } = req.body;
        let existingUser = await User.findOne({ email });
        if (!existingUser){
        return responsHelper(req,res,"Wrong email or password.",null,401);
        }
        console.log(existingUser);
        const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.password
        );
        if (!passwordCorrect) {
        return responsHelper(req,res,"Wrong email or password.",null,401);
        }
        // sign the token
        const token = jwt.sign(
        {
            _id: existingUser._id,
        },
        process.env.JWT_SECRET||"125125"
        )
        // send the token in a HTTP-only cookie
        let user = existingUser.toObject();
        delete user.password ;
        user.token = token ;
        responsHelper(req,res,null,user);
    } catch (err) {
        console.error(err);
        responsHelper(req,res,err);
    }
});
module.exports= router ;