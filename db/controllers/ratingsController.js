var db = require('../index.js');

var saveRating = function(userRating, cb) {
  var username = userRating.username;
  var rating = userRating.rating;
  var product = userRating.product;
  //get customer ID from Customers database
  // db.Customers.findOne({where: {username: username}})
  // .then(function(user) {
  // 	var customerId = user.id;
  // 	//save rating to ProductRatings database
  // 	db.ProductRatings.findOrCreate({where: {product: product, rating: rating, }})



  // }).catch(function(err) {
  // 	cb(err);
  // });
}