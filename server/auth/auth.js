'use strict';

const router = require('express').Router();
const users = require('./users/userRoutes');
const checkout = require('./checkout/checkoutRoutes');

router.use('/checkout', checkout);
router.use('/user', users);

module.exports = router;
