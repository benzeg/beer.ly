'use strict';

const router = require('express').Router();
const recommendations = require('./recommendationsController');

router.route('/*')
  .get(recommendations.get)
  .post(recommendations.post);

module.exports = router;