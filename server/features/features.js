'use strict';

const router = require('express').Router();
const ratings = require('./ratings/ratingsRoutes');
const recommendations = require('./recommendations/recommendationsRoutes');
const status = require('./status/statusRoutes');

// Middleware, check to see if a session exists
router.use(function checkSession(req, res, next) {
  if (!req.session) {
    res.status(401);
    res.end();
  } else {
    next();
  }
});

router.use('/ratings', ratings);
router.use('/recommendations', recommendations);
router.use('/status', status);

module.exports = router;