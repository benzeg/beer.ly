var db = require('../index.js');
var bcrypt = require('bcrypt-nodejs');

exports.userSignup = function(userInput, cb) {
  var username = userInput.username;
  var password = userInput.password;
  var phonenumber = userInput.phonenumber;
  var location = userInput.location;
  //Search in Customers database for username
    //If username is already taken, pass error to callback
      //Otherwise create new database entry for user
  db.Customers.findOrCreate({where: {username: username},
  	defaults: {password: password, 
  			   phonenumber: phonenumber,
  			   location: location}})
  .spread(function(user, created) {
  	if (created === false) {
  	//user already exists
  	  var error = "Username already in use";
  	  cb(error);
  	} else {
  	//new user created
      //create a new User object without password field to be passed to server-side
      var newUser = {};
      newUser.username = user.username;
      newUser.phonenumber = user.phonenumber;
      newUser.location = user.location;
  	  cb(null, newUser);
  	}
  });
};

exports.userLogin = function(userInput, cb) {
  var username = userInput.username;
  var password = userInput.password;

  //Look for user in Customers database
    //If found, compare password using bcrypt.compare
      //Send either error or
        //Send newUser object with password field omitted to callback function
  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
  	bcrypt.compare(password, user.password, function(err, res) {
 	  if (res !== true) {
 	  	var error = "Username/Password do not match";
 	  	cb(error);
 	  } else {
      var newUser = {};
      newUser.username = user.username;
      newUser.phonenumber = user.phonenumber;
      newUser.location = user.location;
 	  	cb(null, newUser);
 	  }
  	})
  }).catch(function(err) {
    //Send error to callback function if username is not found in the database
    cb(err);
  });
};

exports.driverLogin = function(driverInput, cb) {
  var username = driverInput.username;
  var password = driverInput.password;

  db.Drivers.findOne({where: {username: username}})
  .then(function(driver) {
    bcrypt.compare(password, driver.password, function(err, res) {
    if (res !== true) {
      var error = "Username/Password do not match";
      cb(error);
    } else {
      var newDriver = {};
      newDriver.username = driver.username;
      newDriver.phonenumber = driver.phonenumber;
      newDriver.location = driver.location;
      cb(null, newDriver);
    }
    });
  }).catch(function(err) {
    cb(err);
  });
};