var Ratings = require('./../../db/controllers/ratingsController.js');
var beerController = require('./../api/beers/beerController.js');

exports.getRecommendedStyleIds = function(customer, cb) {
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
  var beerArray = [];
  styleIdArray.forEach(function(styleId) {
  	beerController.fetchBeersByStyleId(styleId)
  	.then(function(response) {
  	  var beerArray = response.data;
  	  beerArray = exports.randomize(beerArray);
  	  cb(null, beerArray);
  	}).catch(function(err) {
  	  cb(err);
  	})
  })
}

exports.randomize = function(beerArray) {
  var counter = 0;
  var newbeerArray = [];
  var newbeerCheck = {};
  while (counter < 5) {
  	var index = Math.floor(Math.random() * (beerArray.length - 1));
  	if (newbeerCheck[index] === undefined) {
  	  newbeerArray.push(beerArray[index]);
  	  newbeerCheck[index] = 1;
  	} else {
  	  counter -= 1;
  	}
  	counter += 1;
  }
  return newbeerArray;
}