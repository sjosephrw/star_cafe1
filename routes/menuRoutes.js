const express = require('express');

const menuController = require('../controllers/menuController');
// const categoryController = require('../controllers/categoryController');
//const productController = require('../controllers/productController');
const { accessLevel } = require('../controllers/authController');


//const { upload, cloudinaryResizeAndUploadImage } = require('../utils/imageUploadUtils');
const { checkToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.param('id', listingController.checkID);

//https://stackoverflow.com/questions/40215527/file-upload-with-multer-that-contains-input-name-array

router.route('/')
    .get(menuController.getAllMenus)
    .post(checkToken, accessLevel('root', 'admin'), menuController.createMenu);

router.route('/:id')
    .get(menuController.getMenu)
    .patch(checkToken, accessLevel('root', 'admin'), menuController.updateMenu)
    .delete(checkToken, accessLevel('root', 'admin'), menuController.deleteMenu);

// router.route('/:id/category/')
//     .get(categoryController.getAllCategories)
//     .post(checkToken, accessLevel('root', 'admin'), upload.single('image'), cloudinaryResizeAndUploadImage, categoryController.createCategory);

// router.route('/:id/category/:categoryId')
//     .get(categoryController.getCategory)
//     .patch(checkToken, accessLevel('root', 'admin'),  
//       upload.single('image'), cloudinaryResizeAndUploadImage,
//       categoryController.updateCategory)
//     .delete(checkToken, accessLevel('root', 'admin'), categoryController.deleteCategory);  

// router.route('/:id/category/:categoryId/product/')
//     .get(productController.getAllProducts)
//     .post(checkToken, accessLevel('root', 'admin'), upload.single('image'), cloudinaryResizeAndUploadImage, productController.createProduct);

// router.route('/:id/category/:categoryId/product/:productId')
//     .get(productController.getProduct)
//     .patch(checkToken, accessLevel('root', 'admin'), upload.single('image'), cloudinaryResizeAndUploadImage,    productController.updateProduct)
//     .delete(checkToken, accessLevel('root', 'admin'), productController.deleteProduct);       

module.exports = router;