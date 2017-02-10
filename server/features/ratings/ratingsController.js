'use strict';

const Auth = require('./../../../db/controllers/ratingsController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');
const Beers = require('./../../../server/api/beers/beerController');

const getRatings = function(req, res) {
  Auth.getRatings(req.session.user.username, function(err, data) {
    if (err) {
      console.log('Could not retrieve ratings', err);
      res.status(401);
      res.end();
    } else {
      Beers.fetchBeersByIds(data, function(err, beerObj) {
        if (err) {
          console.log('Not able to return beer array of objects', err);
        } else {
          res.status(200).send(beerObj);
          res.end();      
        }
      });
    }
  });
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
    '/' : getRatings
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