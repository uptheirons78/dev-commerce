const User = require('../models/User');

// exports.userById = (req, res, next, id) => {
//   User.findById(id).exec((err, user) => {
//     // If there is an error or not a user
//     if (err || !user) {
//       return res.status(400).json({
//         error: 'User Not Found'
//       });
//     }
//     // User Found
//     req.profile = user;
//     next();
//   });
// };

// Async Await Version
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
    console.error(e.message);
    res.status(500).send('Server Error');
  }
};
