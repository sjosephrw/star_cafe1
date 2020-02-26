const express = require('express');

const viewController = require('../controllers/viewController');

const router = express.Router();

//home page
router.get('/', viewController.getHomePage);

module.exports = router;