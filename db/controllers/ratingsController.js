var db = require('../index.js');

var saveRating = function(userRating, cb) {
  var username = userRating.username;
  var rating = userRating.rating;
  var product = userRating.product;
  //get customer ID from Customers database
  db.Customers.findOne({where: {username: username}})
  .then(function(user) {
  	var customerId = user.id;
  	//save rating to ProductRatings database
  	db.ProductRatings.findorCreate({where: {productName: product.name, CustomersId: customerId}, 
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
  		  cb(rating);
  		} else {
  		  cb(rating);
  		}
  	});
  }).catch(function(err) {
  	cb(err);
  });
}