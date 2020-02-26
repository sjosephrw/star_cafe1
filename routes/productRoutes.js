const express = require('express');


const productController = require('../controllers/productController');
const { accessLevel } = require('../controllers/authController');


const { upload, cloudinaryResizeAndUploadImage } = require('../utils/imageUploadUtils');
const { checkToken } = require('../utils/jwtUtils');


const router = express.Router();


router.route('/')
    .get(productController.getAllProducts)
    .post(checkToken, accessLevel('root', 'admin'), upload.single('image'), cloudinaryResizeAndUploadImage, productController.createProduct);

router.route('/:id')
    .get(productController.getProduct)
    .patch(checkToken, accessLevel('root', 'admin'), upload.single('image'), cloudinaryResizeAndUploadImage,    productController.updateProduct)
    .delete(checkToken, accessLevel('root', 'admin'), productController.deleteProduct);       

module.exports = router;