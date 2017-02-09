var db = require('../index.js');

exports.saveRating = function(userRating, cb) {
  var username = userRating.username;
  var rating = userRating.rating;
  var product = userRating.product;
  //get customer ID from Customers database
  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
  	var customerId = user.id;
  	db.ProductRatings.findOrCreate({where: {productName: product.name, CustomerId: customerId}, 
  	  defaults: {
        productId: product.id;
        productDescription: product.description,
        productAbv: product.abv,
        productIsOrganic: product.isOrganic,
        productStyleId: product.styleId,
        productBrewery: product.name,
        rating: rating}})
  	.spread(function(rating, created) {
  		if (created === false) {
  		  rating.rating = rating;
        rating.save().then(function() {
          cb(null, rating);
        }).catch(function(err) {
          cb(err);
        });
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
  db.Customers.findOne({where: {username: customerName}})
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

