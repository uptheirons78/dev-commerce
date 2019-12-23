const express = require('express');
const router = express.Router();

// Import Controllers
const { create, categoryById, read, update, remove, list } = require('../controllers/categoryController');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');

// Routes Definitions
router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/categories', list);

// Route Parameter Definitions
router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
