'use strict';

const router = require('express').Router();
const driver = require('./driverController');

router.route('/*')
  .get(driver.get)
  .post(driver.post);

module.exports = router;