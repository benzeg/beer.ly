'use strict';

const Auth = require('./../../../db/controllers/ratingsController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

const getRatings = function(req, res) {

};

const addRatings = function(req, res) {
  Auth.saveRating(req.body, function(err, rating) {
    if (rating) {
      res.status(201);
      res.end();
    } else {
      console.log('Could not save rating');
      res.status(500);
      res.end();
    }
  });
};

// ///////ACTION HANDLERS//////// //

const actions = {
  get: {
    '/' : getRatings// destroy the session
  },
  post: {
    '/': addRatings
  }
};


exports.get = (req, res) => {
  actions.get[req.url](req, res);
};

exports.post = (req, res) => {
  actions.post[req.url](req, res);
};