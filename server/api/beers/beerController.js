'use strict';

const utils = require('../utils/helpers');
const config = require('../../config/apiKeys.js');

exports.fetchBreweryAddresses = function(breweriesArray, cb) {
  const api = {
    key: config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: 'breweries/'
  };

  const breweriesString = breweriesArray.join(',');

  const queryOptions = {
    ids: breweriesString,
    withLocations: 'Y'
  };

  utils.fetchBeer(api, queryOptions, function(err, result) {
    if (err) {
      console.log('Could not fetch addresses', err);
      cb(err);
    } else {
      var addressArray = [];
      var count = 0;
      result.data.data.forEach(function(beer) {
        addressArray.push(beer.locations[0]);
        count++;
      });
      if (count === result.data.data.length) {
        cb(null, addressArray);
      }
    }
  });
};

function fetchBreweryByName(name) {
  const api = {
    key: config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: 'breweries/'
  };

  const queryOptions = {
    // name: 'Fort Point Brewing Company'
    name: name
  };

  return utils.fetch(api, queryOptions);
}

function fetchBeersByBreweryId(breweryID) {
  const api = {
    key: config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: `brewery/${breweryID}/beers/`
  };

  return utils.fetch(api, breweryID);
}


exports.fetchBeersByStyleId = function(styleId) {
  const api = {
    key: config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: 'beers/'
  };
  const queryOptions = {};
  queryOptions['styleId'] = styleId;
  queryOptions['withBreweries'] = 'Y';
  return utils.fetch(api, queryOptions);
};

exports.fetchBeersByIds = function(beerArray, cb) {

  const api = {
    key: config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: 'beers'
  };

  // change array into a string to feed into ids
  let listBeers = [];

  // save object of beers containing ratings based on ids
  let beerObj = {};

  let createStringCount = 0;

  beerArray.forEach(function(beer) {
    listBeers.push(beer.productId);
    beerObj[beer.productId] = beer.rating;
    createStringCount++;
  });

  if (createStringCount === beerArray.length) {
    // create string
    listBeers = listBeers.join(',');

    const queryOptions = {
      ids: listBeers,
      withBreweries: 'Y'
    };

    utils.fetchBeer(api, queryOptions, function(err, data) {
      if (err) {
        console.log('Problem accessing beer api', err);
        cb(err);
      } else {
        let decoratedBeerObj = [];
        let dataCount = 0;
        data.data.data.forEach(function(pureBeerObj) {
          let newObj = pureBeerObj;
          newObj['rating'] = beerObj[pureBeerObj.id];
          decoratedBeerObj.push(newObj);
          dataCount++;
        });
        if (dataCount === data.data.data.length) {
          cb(null, decoratedBeerObj);
        }
      }
    });
  }
};


exports.get = (req, res) => {
  const name = req.params.brewery;

  fetchBreweryByName(name)
    .then((response) => {
      const breweryID = response.data[0].id;
      return fetchBeersByBreweryId(breweryID);
    })
    .then((response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
