'use strict';

const router = require('express').Router();
const drivers = require('./drivers/driverRoutes');
//const Auth = require('./../../db/controllers/authController');

// Middleware Authentication
// router.use(function checkPassword(req, res, next) {
//   console.log('IOEWIPWEJILRWE');
//   Auth.driverLogin(req.body, function(err, driver) {
//     if (err) {
//       console.log('Username and password do not match', err);
//       res.status(401);
//       res.end();
//     } else {
//       next();
//     }
//   });
// });


router.use('/deliveries', drivers);
router.use('/deliveryStatus', drivers);

module.exports = router;