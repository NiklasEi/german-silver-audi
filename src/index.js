require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");

const app = express();

// CORS - allow origin from env file
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes'))

app.listen(process.env.PORT || 3000, function() {
  console.log(`App running on port ${process.env.PORT || 3000}`);
});
