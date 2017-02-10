'use strict';

const router = require('express').Router();
const drivers = require('./drivers/driverRoutes');

// Middleware authentication
// router.use(function checkPassword(req, res, next) {
//   will insert benze checkPassword function here. then next will happen
//   next();

// });

router.use('/driver', drivers);

module.exports = router;