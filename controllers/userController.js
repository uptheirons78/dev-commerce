const User = require('../models/User');

/**
 * User By ID [with Async Await]
 */
exports.userById = async (req, res, next, id) => {
  try {
    // Search for user with its ID
    const user = await User.findById(id);
    // if there is no user return an error message
    if (!user) {
      return res.status(400).json({ error: 'User Not Found' });
    }
    // if there is the user assign it to req.profile and go on ...
    req.profile = user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

/**
 * READ
 */
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

/**
 * UPDATE
 */
exports.update = (req, res) => {
  // Grab name and password from req.body and create variables
  const { name, password } = req.body;
  // Find the user with ID inside req.profile
  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User Not Found'
      });
    }
    // If no name is given return an error
    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }
    // or set the user.name equal to the new name given in req.body
    else {
      user.name = name;
    }
    // If a new password is provided, check first for its length...
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password should be min 6 characters long'
        });
      }
      // then update password with req.body.password
      else {
        user.password = password;
      }
    }
    // Save the new user...
    user.save((err, updatedUser) => {
      if (err) {
        console.log('USER UPDATE ERROR', err);
        return res.status(400).json({
          error: 'User Update Failed'
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};
