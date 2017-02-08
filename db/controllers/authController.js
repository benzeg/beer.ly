var db = require('../index.js');
var bcrypt = require('bcrypt-nodejs');

var userSignup = function(userInput, cb) {
  var username = userInput['username'];
  var password = userInput['password'];
  var phonenumber = userInput['phonenumber'];
  var location = userInput['location'];
  db.Customers.findOrCreate({where: {username: username},
  	defaults: {password: password, 
  			   phonenumber: phonenumber,
  			   location: location}})
  .spread(function(user, created) {
  	if (created === false) {
  	//user already exisits
  	  var error = "Username already in use";
  	  cb(error);
  	} else {
  	//new user created
  	  cb(null, user);
  	}
  });
};

var userLogin = function(userInput, cb) {
  var username = userInput['username'];
  var password = userInput['password'];

  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
  	bcrypt.compare(password, user.password, function(err, res) {
 	  if (res !== true) {
 	  	var error = "Username/Password do not match";
 	  	cb(error);
 	  } else {
 	  	cb(null, res);
 	  }
  	})
  });
};