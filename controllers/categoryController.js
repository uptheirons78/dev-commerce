// Import Category Model
const Category = require('../models/Category');
// Import Error Handler
const { errorHandler } = require('../helpers/dbErrorHandler');

/**
 * Category By ID [with Async Await]
 */
exports.categoryById = async (req, res, next, id) => {
  try {
    // Search for category by its ID
    const category = await Category.findById(id);
    // if there is no category return an error message
    if (!category) {
      return res.status(400).json({ error: 'Category Not Found' });
    }
    // if there is the category assign it to req.category and go on ...
    req.category = category;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

/**
 * Category Create
 */
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

/**
 * Category Read
 */
exports.read = (req, res) => {
  return res.json(req.category);
};

/**
 * Category Update
 */
exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

/**
 * Category Remove
 */
exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: 'Category Successfully Deleted' });
  });
};

/**
 * Category List
 */
exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};
