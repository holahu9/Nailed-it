const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenMiddleware =(req,res,next)=>{
    let {token} = req.headers ;
    if(!token){
        return next();
    }
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET||"125125");
        req.user = decoded ;
        return next();
      } catch(err) {
        return next();
    }
}
const requiredUserAuthen =(req,res,next)=>{
    if(!req.user){
        return res.status(403).json({
            code:403,
            message:"authen fail"
        })
    }
    return next();
}
module.exports = {
    authenMiddleware,
    requiredUserAuthen
}