const passport = require("passport");
const router = require("express").Router()
const User = require('../controller/user')
const multer  = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image');
  },
  filename: function (req, file, cb) {
    cb(null, "image" + '.txt');
  }
})

const upload = multer({ storage: storage });

// signup route
router.post("/", User.create)

// login route
router.post("/login", User.login)

// update route
router.put("/:id", passport.authenticate('jwt', { session: false }), User.update)

// Thumbnail route
router.post('/upload',passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res, next) => {
    const filePath = path.join(__dirname, '../image/image.txt')
    try {
        sharp(filePath).resize(50, 50).toFile('uploads/' + 'thumbnails-image', (err, resizeImage) => {
            if (err) {
                res.status(500).send(err)
            } else {
                // console.log(resizeImage);
                fs.unlinkSync(filePath);
            }
        })
        return res.status(200).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        res.status(500).send(error)
    }
});
module.exports=router