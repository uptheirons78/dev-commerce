const express = require('express');
const router = express.Router();

// Import Controllers
const { sayHello } = require('../controllers/userController');

router.get('/', sayHello);

module.exports = router;
