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
    db.ProductRatings.findAll({where: {CustomersId: customerId}})
    .then(function(ratings) {
      cb(null, ratings);
    }).catch(function(err) {
      cb(err);
    });
  }).catch(function(err) {
      cb(err);
  });
<<<<<<< HEAD
};
=======
} 
>>>>>>> e8fc4f5c40d6518b45daf0e187ce2a99e26deca4
