// Import FS, Formidable and Lodash
const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');
// Import Product Model
const Product = require('../models/Product');
// Import Error Handler
const { errorHandler } = require('../helpers/dbErrorHandler');

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
