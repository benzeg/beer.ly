'use strict';

const router = require('express').Router();
const users = require('./users/userRoutes');
const checkout = require('./checkout/checkoutRoutes');
const drivers = require('./drivers/driverRoutes');

router.use('/checkout', checkout);
router.use('/user', users);

//future implementation for signing in, signing out, and signing up a driver
router.use('/driver', drivers);

module.exports = router;
