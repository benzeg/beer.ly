'use strict';

const router = require('express').Router();
const ratings = require('./ratingsController');

router.route('/*')
  .get(ratings.get)
  .post(ratings.post);

module.exports = router;