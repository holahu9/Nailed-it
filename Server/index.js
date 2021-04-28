const express = require("express");
const app = express();
const dotenv = require("dotenv");
var mongoose = require('mongoose');
const {  ValidationError } = require('express-validation');
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Server = require('./src/servers');
const  {authenMiddleware} = require('./src/middleware/authen.middleware');
app.use(express.urlencoded({extended:true}));
app.use(express.json()); // apply any common request
app.use(cookieParser());
app.use(cors());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_DB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify :false

    },(err)=>{
    if (err)
        return console.error(err);
        console.log("Connected to MongoDB");
})
app.use(authenMiddleware);
app.use("/",Server);
app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(401).json({
          code:401,
          message:err
      })
    }
  
    return res.status(400).json({
        code:400,
        message:err
    })
  })
app.listen(PORT, ()=> console.log(`Server start on Port: ${PORT}`));