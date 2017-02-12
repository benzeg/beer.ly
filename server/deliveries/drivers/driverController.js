'use strict';

const Driver = require('./../../../db/controllers/deliveriesController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

const getDeliveries = function(req, res) {
  Driver.getDelivery(req.query, function(err, data) {
    if (err) {
      console.log('Could not retrieve deliveries', err);
      res.status(500);
      res.end();
    } else {
      console.log(data);
      res.status(200).send(data);
      res.end();
    }
  });
};

const postStatus = function(req, res) {
  Driver.updateDelivery(req.body, function(err, data) {
    if (data) {
      res.status(201);
      res.end();
    } else {
      console.log('Could not save status', err);
      res.status(500);
      res.end();
    }
  });
};

// ///////ACTION HANDLERS//////// //

exports.get = (req, res) => {
  getDeliveries(req, res);
};

exports.post = (req, res) => {
  postStatus(req, res);
};