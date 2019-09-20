const express = require("express");
const router = express.Router();

router.use(require("./getUser"));
router.use(require("./newAccount"));

router.use((req, res, next) => {
  next(new Error("404 - Page not found"));
});

// Development error handler will print stacktrace
if (router.get("env") === "development") {
  router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: err});
  });
} else {
  router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: err.message
    });
  });
}

module.exports = router;
