const { check } = require('express-validator');

exports.userSignupValidator = [
  // Check name field
  check('name', 'Name is required').notEmpty(),

  // Check email field
  check('email', 'Email must be between 3 and 32 characters')
    .isEmail()
    .withMessage('It must be a valid email address')
    .isLength({ min: 4, max: 32 }),

  // Check password field not empty
  check('password', 'Password is required').notEmpty(),
  // Check password field length and contain at least one number
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least a number')
];

/**
 *
 * exports.userSignupValidator = (req, res, next) => {
  // Check name field
  req.check('name', 'Name is required').notEmpty();

  // Check email field
  req
    .check('email', 'Email must be between 3 and 32 characters')
    .isEmail()
    .withMessage('It must be a valid email address')
    .isLength({ min: 4, max: 32 });

  // Check password field
  req.check('password', 'Password is required').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least a number');

  // Check for errors and grab the first one
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(err => err.message)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
 */
