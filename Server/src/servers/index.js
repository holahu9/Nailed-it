let express = require('express');
let router = express.Router();
let userService = require('./users');
let profileService = require('./profiles');
let reviewsService = require('./reviews');
let uploadService = require('./upload');
router.use("/users",userService);
router.use("/profile",profileService);
router.use("/reviews",reviewsService);
router.use("/upload",uploadService)
module.exports= router ;