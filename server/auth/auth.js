'use strict';

const router = require('express').Router();
const users = require('./users/userRoutes');
const checkout = require('./checkout/checkoutRoutes');
//////NEW ROUTES START HERE//////
const signout = require('./signout/signoutRoutes');
const signup = require('./signup/signupRoutes');
const signin = require('./signin/signinRoutes');


router.use('/checkout', checkout);
router.use('/users', users);
//////NEW ROUTES START HERE//////
router.use('/signout', signout);
router.use('/signin', signin);
router.use('/signup', signup);

module.exports = router;
