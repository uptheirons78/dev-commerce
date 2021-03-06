require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import Different Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// Application
const app = express();

// Variables
const PORT = process.env.PORT || 8000;

// Database Connection
const connectDB = (async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('DB Connected ...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();

// Init Middlewares
app.use(morgan('dev'));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Use Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.listen(PORT, () => console.log(`Server is correctly running on PORT:${PORT}`));
