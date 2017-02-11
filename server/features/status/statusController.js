'use strict';

const Status = require('./../../../db/controllers/deliveriesController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');
const Breweries = require('./../../../server/api/beers/beerController');

// ///////ACTION HANDLERS//////// //

const getStatus = function(req, res) {
  
};

const postJob = function(req, res) {
  // address, api call
  Breweries.fetchBreweryAddresses(req.body.supplyAddresses, function(err, supplyArray) {
    if (err) {
      console.log('Could not get locations of breweries', err);
    } else {
      const transaction = {
        username: req.body.username,
        supplyAddresses: supplyArray,
        deliveryAddress: req.body.deliveryAddress
      };

      Status.saveDeliveries(transaction, function(err, success) {
        if (err) {
          console.log('Could not save deliveries', err);
        } else {
          res.status(201);
          res.end();
        }
      });
    }
  });
};

const actions = {
  get: {
    '/' : getStatus
  },
  post: {
    '/' : postJob
  }
};


exports.get = (req, res) => {
  actions.get[req.url](req, res);
};

exports.post = (req, res) => {
  actions.post[req.url](req, res);
};