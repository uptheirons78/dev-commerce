// Import User Model
const User = require('../models/User');
// Import Error Handler
const { errorHandler } = require('../helpers/dbErrorHandler');

// Create New User
exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};
