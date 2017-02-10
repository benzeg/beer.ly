'use strict';

const router = require('express').Router();
const status = require('./statusController');

router.route('/*')
  .get(status.get)
  .post(status.post);

module.exports = router;