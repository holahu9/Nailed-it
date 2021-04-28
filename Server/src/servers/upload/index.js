let express = require("express");
let router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name:"dq8rwm2xl",
    api_key:"649224587624114",
    api_secret:"1Rt7KRLHizMjdAiBeEj3FUh3rMM"
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'image',
    },
  });
const parser = multer({ storage: storage });
router.post("/",parser.single('image'), function (req, res) {
    res.json(req.file);
})
module.exports = router;