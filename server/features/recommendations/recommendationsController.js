'use strict';

const Recommendations = require('./../../middleware/recommendations');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');


const getRecommendation = function(req, res) {
  Recommendations.getRecommendedStyleIds(req.session.user.username, function(err, recommendArray) {
    if (err) {
      console.log('Could not get user recommendations', err);
    } else {
      console.log(recommendArray);
      res.status(200).send(recommendArray);
      res.end();
    }
  });
};

// ///////ACTION HANDLERS//////// //

// const actions = {
//   //post for testing
//   //change to get later
//   post: {
//     '/' : getRecommendation
//   }
// };


exports.get = (req, res) => {
  getRecommendation(req, res);
};

exports.post = (req, res) => {
  actions.post[req.url](req, res);
};