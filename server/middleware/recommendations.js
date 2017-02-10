var Ratings = require('./../../db/controllers/ratingsController.js');

exports.getRecommendedStyleIds = function(customer) {
  Ratings.getRatings(customer, function (err, ratings) {
  	if (err) {
      cb(err);
  	} else {
  	  var ratingsObj = {};
  	  ratings.forEach(function(rating) {
  	  	var styleId = rating.productStyleId;
  	  	if (ratingsObj[styleId] === null) {
  	  		ratingsObj[styleId] = {average:0, setNum:0};
  	  	};
  	  	var sum = ratingsObj[styleId].average * setNum;
  	  	sum += rating.rating;
  	  	setNum += 1;
  	  	ratingsObj[styleId].average = sum / setNum;
  	  });

  	  var recommendedStyleIds = [];

  	  for (var styleId in ratingsObj) {
  	  	if (ratingsObj[styleId].average >= 3) {
  	  		recommendedStyleIds.push(styleId);
  	  	}
  	  }
  	  return exports.getRecommendedProducts(recommendedStyleIds, cb);
  	}
  });
};

exports.getRecommendedProducts = function(styleIdArray, cb) {
  
}