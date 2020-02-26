const express = require('express');

// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', listingController.checkID);

//https://stackoverflow.com/questions/40215527/file-upload-with-multer-that-contains-input-name-array
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router
// .route('/')
// .get(userController.getAllUsers)
// .post(userController.createUser);

// router
// .route('/:id')
// .get(userController.getUser)
// .patch(userController.updateUser)
// .delete(userController.deleteUser);


module.exports = router;