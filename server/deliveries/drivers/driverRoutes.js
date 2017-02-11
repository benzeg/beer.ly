'use strict';

const router = require('express').Router();
const driver = require('./driverController');

router.use(function(req, res, next) {
  console.log('yayyyyayyyyy');
  next();
});

router.route('/*')
  .get(driver.get)
  .post(driver.post);

module.exports = router;