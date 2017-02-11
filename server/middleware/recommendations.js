var Ratings = require('./../../db/controllers/ratingsController.js');
var beerController = require('./../api/beers/beerController.js');

exports.getRecommendedStyleIds = function(customer, cb) {
  Ratings.getRatings(customer, function(err, ratings) {
  	if (err) {
      cb(err);
  	} else {
  	  var ratingsObj = {};
      ratingsObj['count'] = 0;
  	  ratings.forEach(function(rating) {
  	  	var styleId = rating.productStyleId;
  	  	if (!ratingsObj[styleId]) {
          ratingsObj.count++;
  	  		ratingsObj[styleId] = {average:0, setNum:0};
  	  	};
  	  	var sum = ratingsObj[styleId].average * ratingsObj[styleId].setNum;
  	  	sum += rating.rating;
  	  	ratingsObj[styleId].setNum += 1;
  	  	ratingsObj[styleId].average = sum / ratingsObj[styleId].setNum;
  	  });

  	  var recommendedStyleIds = [];
      var counter = 0;
      
  	  for (var styleId in ratingsObj) {
        if(styleId !== 'count') {
          counter++;
    	  	if (ratingsObj[styleId].average >= 3) {
    	  		recommendedStyleIds.push(styleId);
    	  	}

          if (counter === ratingsObj.count) {
            if (recommendedStyleIds.length === 0) {
              cb(null, []);
            } else {
              return exports.getRecommendedProducts(recommendedStyleIds, cb);
            }
          }
        }
  	  }
  	}
  });
};

exports.getRecommendedProducts = function(styleIdArray, cb) {
  //initialize empty beer array
  var beerArray = [];
  var counter = 0;
  var size = styleIdArray.length;
  //for each styleId in array of styles,
    //make api call to BreweryDB to obtain list of beers pertaining to each styleId
  styleIdArray.forEach(function(styleId) {
  	beerController.fetchBeersByStyleId(styleId)
  	.then(function(response) {
  	  var newbeerArray = response.data;
  	  //extract 5 random beers from response
  	    //concat to beerArray
  	  newbeerArray = exports.randomize(newbeerArray);
  	  beerArray = beerArray.concat(newbeerArray);
  	  counter++;
  	  if (counter === size) {
  	  	cb(null, beerArray);
  	  }
  	}).catch(function(err) {
  	  cb(err);
  	})
  });
};

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
};