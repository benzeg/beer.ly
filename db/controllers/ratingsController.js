var db = require('../index.js');

exports.saveRating = function(userRating, cb) {
  var username = userRating.username;
  var rating = userRating.rating;
  var product = userRating.product;
  //get customer ID from Customers database
  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
  	var customerId = user.id;
  	//save rating to ProductRatings database
  	db.ProductRatings.findOrCreate({where: {productName: product.name, CustomerId: customerId}, 
  	  defaults: {
        productDescription: product.description,
        productAbv: product.abv,
        productIsOrganic: product.isOrganic,
        productStyleId: product.styleId,
        productBrewery: product.brewery,
        rating: rating}})
  	.spread(function(rating, created) {
  		if (created === false) {
  		  rating.rating = rating;
  		  cb(null, rating);
  		} else {
  		  cb(null, rating);
  		}
  	});
  }).catch(function(err) {
  	cb(err);
  });
};

//////////////////////////////////////////////////////////////////////

exports.getRatings = function(customerName, cb) {
  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
    var customerId = user.id;
    db.ProductRatings.findAll({where: {CustomerId: customerId}})
    .then(function(ratings) {
      cb(null, ratings);
    }).catch(function(err) {
      cb(err);
    });
  }).catch(function(err) {
      cb(err);
  });
};

