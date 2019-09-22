require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");
const httpContext = require("express-http-context");

// CORS - allow origin from env file
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// assign a unique identifier to each request to be able to identify requests in the logs
app.use(httpContext.middleware);
app.use(function(req, res, next) {
  httpContext.set("reqId", uuid.v1());
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require("./routes"));

app.listen(process.env.PORT || 3000, function() {
  console.log(`App running on port ${process.env.PORT || 3000}`);
});
