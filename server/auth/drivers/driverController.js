'use strict';

const Auth = require('./../../../db/controllers/authController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

//what is a session like on a phone?
const signout = function(req, res) {
  req.session.destroy(function() {
    res.status(200);
    res.end();
  });
};

//for sign in and sign up, need a controller for drivers from DB

const actions = {
  get: {
    '/signout' : signout, // destroy the session
    //'/checkDriver/*': checkDriver,
  },
  post: {
    //'/signup': registerUser,
    //'/signin': logIn  // add to database //check session
  }
};

exports.get = (req, res, next) => {
  actions.get[req.url](req, res);
};

exports.post = (req, res, next) => {
  actions.post[req.url](req, res);
};