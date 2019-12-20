require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Application
const app = express();

// Variables
const PORT = process.env.PORT || 8000;

// Database Connection
const connectDB = (async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );
    console.log("DB Connected ...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () =>
  console.log(`Server is correctly running on PORT:${PORT}`)
);
