// Import FS, Formidable and Lodash
const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');
// Import Product Model
const Product = require('../models/Product');
// Import Error Handler
const { errorHandler } = require('../helpers/dbErrorHandler');

/**
 * Product By ID [with Async Await]
 */
exports.productById = async (req, res, next, id) => {
  try {
    // Search for product by its ID
    const product = await Product.findById(id);
    // if there is no product return an error message
    if (!product) {
      return res.status(400).json({ error: 'Product Not Found' });
    }
    // if there is the product assign it to req.product and go on ...
    req.product = product;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

/**
 * Product Read
 */
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

/**
 * Product Create
 */
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' });
    }

    // Check for all the fields
    const { name, description, price, category, quantity, shipping } = fields;
    // If something is missed send an error message ...
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // If all fields are ok, create a new product;
    let product = new Product(fields);

    if (files.photo) {
      // Size Validation
      // If over 1MB it will not be uploaded
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: 'Image over 1MB. Impossible to load it' });
      }

      // If it is less 1MB it will be uploaded
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    // If everything is OK, save the product inside DB
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

/**
 * Product Delete
 */
exports.remove = (req, res) => {
  // Product is equal to req.product
  let product = req.product;
  // Run remove() method and check for errors
  product.remove((err, deletedProduct) => {
    // If errors ...
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    // No errors
    res.json({ message: 'Product Successfully Deleted' });
  });
};

/**
 * Product Update
 */
exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' });
    }

    // Check for all the fields
    const { name, description, price, category, quantity, shipping } = fields;
    // If something is missed send an error message ...
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // If all fields are ok, update the product
    let product = req.product;
    // Use Lodash extend() method to update
    product = _.extend(product, fields);

    if (files.photo) {
      // Size Validation
      // If over 1MB it will not be uploaded
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: 'Image over 1MB. Impossible to load it' });
      }

      // If it is less 1MB it will be uploaded
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    // If everything is OK, save the product inside DB
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

/**
 * Display products based on sell and arrival with query parameters:
 * Examples:
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 *
 * If no parameter is set, return all products.
 */
exports.list = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    const products = await Product.find()
      .select('-photo')
      .populate('category')
      .sort([[sortBy, order]])
      .limit(limit);

    if (!products) {
      return res.status(400).json({ error: 'Products Not Found' });
    }

    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

/**
 * Display related products
 */
exports.listRelated = async (req, res) => {
  try {
    // Limit query: default 6
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    // Find all products of same category excluding the one in the req
    // Populate Category only with name and _id
    const products = await Product.find({ _id: { $ne: req.product }, category: req.product.category })
      .limit(limit)
      .populate('category', '_id name');

    if (!products) {
      return res.status(400).json({ error: 'Products Not Found' });
    }

    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
