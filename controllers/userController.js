// Import JWT
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
// Import User Model
const User = require('../models/User');
// Import Error Handler
const { errorHandler } = require('../helpers/dbErrorHandler');
// Import Validator Error Handling
const { validationResult } = require('express-validator');

// Create New User
exports.signup = (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  // If there's validation errors, return them
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

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

// Signin
exports.signin = (req, res) => {
  // Find User with Email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please register'
      });
    }
    // Make sure email and password match
    // Create Auth Method in User Model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match'
      });
    }
    // Generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });

    // Return Response with User and Token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

// Signout
exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout Success' });
};

// Middleware to protect our routes
exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
});
