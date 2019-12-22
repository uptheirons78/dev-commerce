const express = require('express');
const router = express.Router();

// Import Controllers
// requireSignin: is a method for protected routes
const { signup, signin, signout, requireSignin } = require('../controllers/authController');

// Import userSignupValidator
const { userSignupValidator } = require('../validator/index');

// Routes Definitions
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;
