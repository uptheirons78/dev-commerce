const express = require("express");
const app = express();

require("dotenv").config();

// Variables
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () =>
  console.log(`Server is correctly running on PORT:${PORT}`)
);
