'use strict';

const router = require('express').Router();
const drivers = require('./drivers/driverRoutes');
const Auth = require('./../../db/controllers/authController');

// Middleware Authentication
router.use(function checkPassword(req, res, next) {
  Auth.driverLogin(req.body, function(err, driver) {
    if (err) {
      console.log('Username and password do not match', err);
    } else {
      next();
    }
  });
});

router.use('/driver', drivers);

module.exports = router;