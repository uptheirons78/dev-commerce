const express = require('express');
const router = express.Router();

// Import Controllers
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

// Routes Definitions
router.param('userId', userById);

module.exports = router;
