'use strict';

const utils = require('../utils/helpers');
const config = require('../../config/apiKeys.js');

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

  return utils.fetch(api, {});
}

exports.fetchBeersByIds = function(beerArray) {
  const api = {
    key: config.breweryDBKey,
    url: 'http://api.brewerydb.com/v2/',
    endPoint: 'beers'
  };

  // change array into a string to feed into ids
  var listBeers = [];
  var beerObj = {};
  beerArray.forEach(function(beer) {
    listBeers.push(beer.productId);
    beerObj[beer.productId] = beer.rating;
  });

  listBeers = listBeers.join(',');

  const queryOptions = {
    ids: listBeers
  };

  return utils.fetch(api, queryOptions);
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
