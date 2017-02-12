'use strict';

const Driver = require('./../../../db/controllers/deliveriesController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

const getDeliveries = function(req, res) {
  // TODO: Function from db controller
  console.log('DELIVERIES WOO');
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
      console.log('This is the delivery object', data);
      res.status(201);
      res.end();
    } else {
      console.log('Could not save status', err);
      res.status(500);
      res.end();
    }
  });
};

// const actions = {
//   get: {
//     '/*': getDeliveries
//   },
//   post: {
//     '/*': postStatus,
//   }
// };

exports.get = (req, res) => {
  console.log('aewhflew', req.url);
  getDeliveries(req, res);
};

exports.post = (req, res) => {
  postStatus(req, res);
};