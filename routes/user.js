const express = require('express');
const router = express.Router();

// Import Controllers
const { signup } = require('../controllers/userController');

router.post('/signup', signup);

module.exports = router;
