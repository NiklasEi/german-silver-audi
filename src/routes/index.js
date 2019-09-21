const express = require("express");
const router = express.Router();
const logger = require("../logger");

router.use(require("./getUser"));
router.use(require("./newAccount"));

router.use(function(req, res, next) {
  if (res.result) {
    logger.info("Got %s", JSON.stringify(res.result));
    res.status(200).json(res.result);
  }
  next();
});

if (process.env.NODE_ENV === "development") {
  // Development error handler will pass stacktrace
  router.use(function(err, req, res, next) {
    res.status(err.httpCode || 500);
    res.json({ error: { ...err, message: err.message, stack: err.stack } });
  });
} else {
  router.use(function(err, req, res, next) {
    res.status(err.httpCode || 500);
    res.json({
      error: err.message
    });
  });
}

module.exports = router;
