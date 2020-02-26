const express = require('express');

const cartController = require('../controllers/cartController');

const { checkToken } = require('../utils/jwtUtils');

const router = express.Router();

// router.param('id', listingController.checkID);

//https://stackoverflow.com/questions/40215527/file-upload-with-multer-that-contains-input-name-array

router.route('/')
    .get(checkToken, cartController.getCart);

router.route('/:id')
    .post(checkToken, cartController.addToCart)
    /* .delete(checkToken, cartController.deleteFromCart)*/;

module.exports = router;