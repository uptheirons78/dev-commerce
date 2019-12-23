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
