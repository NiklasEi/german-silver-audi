const express = require("express");
const router = express.Router();
const logger = require("../logger");
const httpCotext = require("express-http-context");

router.use(require("./getUser"));
router.use(require("./newAccount"));

if (process.env.NODE_ENV === "development") {
  router.use(function(req, res, next) {
    if (res.result) {
      logger.info("Aswering reqest %s", JSON.stringify(res.result), {
        reqId: httpCotext.get("reqId")
      });
      res.status(200).json(res.result);
    }
    next();
  });
  // Development error handler will pass stacktrace
  router.use(function(err, req, res, next) {
    res.status(err.httpCode || 500);
    res.json({ error: { ...err, message: err.message, stack: err.stack } });
  });
} else {
  // don't log the response in production
  router.use(function(req, res, next) {
    if (res.result) {
      logger.info("Aswering reqest", { reqId: httpCotext.get("reqId") });
      res.status(200).json(res.result);
    }
    next();
  });
  router.use(function(err, req, res, next) {
    res.status(err.httpCode || 500);
    res.json({
      error: err.message
    });
  });
}

module.exports = router;
