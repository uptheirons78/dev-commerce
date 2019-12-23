const express = require('express');
const router = express.Router();

// Import Controllers
const { create, productById, read, remove, update } = require('../controllers/productController');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');

// Routes Definitions
router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

// Route Parameter Definitions
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
