const axios = require('axios');

// Helper function for creating url with query string and api key
const createUrl = (api, queryOptions) => {
  const key = '?key=' + api.key;

  const queryStrings = [];

  // Create query string from all query options
  for (const query in queryOptions) {
    if (typeof queryOptions[query] === 'string') {
      // encode spaces for url if query option is string
      queryStrings.push(query + '=' + queryOptions[query].replace(' ', '+'));
    } else {
      queryStrings.push(query + '=' + queryOptions[query]);
    }
  }

  return api.url + api.endPoint + key + '&' + queryStrings.join('&');
};

exports.fetch = (api, queryOptions) => {
  let decorator = false;
  let id;
  let url;
  if (typeof queryOptions === 'string') {
    decorator = true;
    id = queryOptions;
    url = createUrl(api, {});
  } else {
    url = createUrl(api, queryOptions);
  }
  console.log('url', url);
  return axios.get(url)
    .then((response) => {
      if (decorator) {
        var counter = 0;
        response.data.data.forEach(function(beer) {
          var newArray = [];
          newArray.push({id: id});
          beer.breweries = newArray;
          counter++;
        });
        if (counter === response.data.length) {
          return response.data;
        }
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

exports.fetchBeer = (api, queryOptions, cb) => {
  const url = createUrl(api, queryOptions);
  axios.get(url)
    .then((response) => {
      cb(null, response);
    })
    .catch((error) => {
      cb(error, null);
    });
};


