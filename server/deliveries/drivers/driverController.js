'use strict';

const Driver = require('./../../../db/controllers/deliveriesController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

const getDeliveries = function(req, res) {
  // TODO: Function from db controller
  // Driver.getDeliveries(req.body, function(err, data) {
    // if (err) {
      // console.log('Could not retrieve deliveries', err)
    // } else {
      // console.log(data)
      // TODO: Return an array, see if I need to format it
      // res.status(200).send(data);
      // res.end();
    // }
  // });
};

const postStatus = function(req, res) {
  // Driver.updateDeliveries(req.body, function(err, data) {
    // if (data) {
      // res.status(201);
      // res.end();
    // } else {
      // console.log('Could not save status', err);
      // res.status(500);
      // res.end();
    // }
  // });
};

const actions = {
  get: {
    '/deliveries': getDeliveries
  },
  post: {
    '/deliveryStatus': postStatus
  }
};

exports.get = (req, res) => {
  actions.get[req.url](req, res);
};

exports.post = (req, res) => {
  actions.post[req.url](req, res);
};