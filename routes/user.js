const express = require('express');
const router = express.Router();

// Import Controllers
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const { userById, read, update } = require('../controllers/userController');

// Routes Definitions
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);

// Route Parameter Definitions
router.param('userId', userById);

module.exports = router;
