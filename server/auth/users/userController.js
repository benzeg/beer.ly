'use strict';

// TODO , ES6

const Auth = require('./../../../db/controllers/authController');
const jwt = require('jsonwebtoken');
const config = require('../../config/apiKeys');

// /////////SESSIONS//////////// //

const createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    sendUserData(req, res, newUser);
  });
};

const sendUserData = function(req, res, newUser) {
  //newUser is passed in after a login
  if (newUser) {
    req.session.user = newUser;
  }

  let userInfo = {};

  //finalize based on schema in mySQL
  userInfo['username'] = req.session.user.username;
  userInfo['location'] = req.session.user.location;
  userInfo['phonenumber'] = req.session.user.phonenumber;
  res.status(200).send(userInfo);
  res.end();
};

const checkUser = function(req, res) {
  if (!req.session) {
    res.status(401);
    res.end();
  } else {
    let user = req.session.user;
    sendUserData(req, res, user);
  }
};

// /////////ACTIONS//////////// //

// Register new users
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
    '/signout' : signout, // destroy the session
    '/checkUser/*': checkUser,
  },
  post: {
    '/signup': registerUser,
    '/signin': logIn  // add to database //check session
  }
};


exports.get = (req, res, next) => {
  actions.get[req.url](req, res);
};

exports.post = (req, res, next) => {
  actions.post[req.url](req, res);
};
