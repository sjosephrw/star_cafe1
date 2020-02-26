const express = require('express');

const { upload, cloudinaryResizeAndUploadImage } = require('../utils/imageUploadUtils');

const { checkToken } = require('../utils/jwtUtils');

const slideShowController = require('../controllers/slideShowController');
const { accessLevel } = require('../controllers/authController');

const router = express.Router();

// router.param('id', listingController.checkID);

//https://stackoverflow.com/questions/40215527/file-upload-with-multer-that-contains-input-name-array

router.route('/')
    .get(slideShowController.getAllSlides)
    .post(checkToken, accessLevel('root', 'admin'), upload.single('image'),
          cloudinaryResizeAndUploadImage, 
          slideShowController.createSlide);

router.route('/:id')
    .get(slideShowController.getSlide)
    .patch(checkToken, accessLevel('root', 'admin'), upload.single('image'),
           cloudinaryResizeAndUploadImage,
           slideShowController.updateSlide)
    .delete(checkToken, accessLevel('root', 'admin'), slideShowController.deleteSlide);

module.exports = router;