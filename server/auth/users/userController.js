'use strict';

//TODO , ES6

//OLD USER MODEL
//const User = require('./userModel');

//TODO: USER MODEL CONTROLLER. CHECK WITH BENZE TO SEE WHAT IS EXPORTED
//const Customer = require('./../../../db/controllers/customerController');

const jwt = require('jsonwebtoken');
let config = require('../../config/apiKeys');


exports.get = (req, res, next) => {
  actions.get[req.url](req, res);
};

exports.post = (req, res, next) => {
  actions.post[req.url](req, res);
};

// /////////SESSIONS//////////// //

//called from login
var createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    exports.sendUserData(req, res, newUser);
  });
};

var sendUserData = function(req, res, newUser) {
  //newUser is passed in after a login
  if (newUser) {
    req.session.user = newUser;
  }

  var userInfo = {};

  //finalize based on schema in mySQL
  userInfo['username'] = req.session.user.username;
  userInfo['location'] = req.session.user.location;
  res.status(200).send(userInfo);
  res.end();
};

//from user endpoint
var checkUser = function(req, res) {
  if (!req.session) {
    res.status(401);
    res.end();
  } else {
    sendUserData(req, res);
  }
};

// /////////ACTIONS//////////// //

// Register new users
var registerUser = function(req, res) {
  //TODO
};

// Authenticate the user and get a JSON Web Token to include in 
// the header of future requests.
var logIn = function(req, res) {
  //send req.body to compare password function in db controller
  //return the user if match?
  Customer.comparePassword(req.body, function(err, user) {
    if (user) {
      createSession(req, res, user);
    }
  });
};

var signout = function(req, res) {
  req.session.destroy(function() {
    res.status(200);
    res.end();
  });
};

// ///////ACTION HANDLERS//////// //

var actions = {
  get: {
    '/signout/' : signout, //destroy the session
    '/user/': checkUser
  },
  post: {
    '/signup/': registerUser, //add to database
    '/signin/': logIn //check to see if session exists. if it doesn't, check user credentials, make sure they match, then create session
  }
};
