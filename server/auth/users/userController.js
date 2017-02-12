'use strict';

const Auth = require('./../../../db/controllers/authController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

// /////////SESSIONS//////////// //

const sendUserData = function(req, res, newUser) {

  if (newUser) {
    req.session.user = newUser;
  }

  let userInfo = {};

  userInfo['username'] = req.session.user.username;
  userInfo['location'] = req.session.user.location;
  userInfo['phonenumber'] = req.session.user.phonenumber;
  res.status(200).send(userInfo);
  res.end();
};

const createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    sendUserData(req, res, newUser);
  });
};

// /////////ACTIONS//////////// //

const registerUser = function(req, res) {
  Auth.userSignup(req.body, function(err, user) {
    if (user) {
      res.status(201);
      res.end();
    } else {
      console.log('Username is already taken');
      res.status(500);
      res.end();
    }
  });
};

const logIn = function(req, res) {
  Auth.userLogin(req.body, function(err, user) {
    if (user) {
      createSession(req, res, user);
    } else {
      console.log('Username and password do not match', err);
      res.status(401);
      res.end();
    }
  });
};

const signout = function(req, res) {
  req.session.destroy(function() {
    res.status(200);
    res.end();
  });
};

// ///////ACTION HANDLERS//////// //

const actions = {
  get: {
    '/signout' : signout,
  },
  post: {
    '/signup': registerUser,
    '/signin': logIn
  }
};

exports.get = (req, res) => {
  actions.get[req.url](req, res);
};

exports.post = (req, res) => {
  actions.post[req.url](req, res);
};
