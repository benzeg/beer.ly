'use strict';

//const Status = require('./../../../db/controllers/ratingsController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

// ///////ACTION HANDLERS//////// //

const getStatus = function(req, res) {
  // TODO: insert function from approp controller
};

const postJob = function(req, res) {
  //saveDeliveries
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