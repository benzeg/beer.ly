'use strict';

const router = require('express').Router();
const ratings = require('./ratings/ratingsRoutes');

router.use(function checkSession(req, res, next) {
  console.log('IN CHECKSESSION');
  if (!req.session) {
    res.status(401);
    res.end();
  } else {
    next();
  }
});

router.use('/ratings', ratings);

module.exports = router;