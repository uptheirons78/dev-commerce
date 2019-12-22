const express = require('express');
const router = express.Router();

// Import Controllers
const { create } = require('../controllers/categoryController');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');

// Routes Definitions
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

// Route Parameter Definitions
router.param('userId', userById);

module.exports = router;
