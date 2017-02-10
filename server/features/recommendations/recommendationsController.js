'use strict';

const Recommendations = require('./../../../db/controllers/ratingsController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

// ///////ACTION HANDLERS//////// //

const getRecommendation = function(req, res) {

};

const actions = {
  get: {
    '/' : getRecommendation
  }
};


exports.get = (req, res) => {
  actions.get[req.url](req, res);
};

exports.post = (req, res) => {
  actions.post[req.url](req, res);
};