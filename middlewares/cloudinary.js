const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: "dqpxzkx9r",
    api_key: "738194227414147",
    api_secret: "0H8H4KskU3BwJtv4C93eukx86h0"
})

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    // filename: function (req, file, cb){
    //     cb(null, file.originalname);
    // }
    params: {
        folder: 'learn_nodejs'
    }
})

const uploadCloud = multer({storage});

module.exports = uploadCloud

// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   allowedFormats: ['jpg', 'png'],
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); 
//   }
// });

// const uploadCloud = multer({ storage });

module.exports = uploadCloud;
