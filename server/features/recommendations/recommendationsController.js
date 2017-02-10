'use strict';

const Recommendations = require('./../../middleware/recommendations');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');


const getRecommendation = function(req, res) {
  Recommendations.getRecommendedStyleIds(req.session.user, function(err, recommendArray) {
    if (err) {
      console.log('Could not get user recommendations', err);
    } else {
      res.status(200).send(recommendArray);
      res.end();
    }
  });
};

// ///////ACTION HANDLERS//////// //

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