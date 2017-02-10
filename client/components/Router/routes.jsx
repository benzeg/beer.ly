import React from 'react';
import App from '../App/App';
import Home from '../Home/Home';
import City from '../City/City';
import Brewery from '../Brewery/Brewery';
import Checkout from '../Checkout/Checkout';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Browse from '../Browse/Browse';
import Ratings from '../Ratings/Ratings';
import Recommendations from '../Recommendations/Recommendations';

import { Route, IndexRoute } from 'react-router';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/browse" component={Browse} />
    <Route path="/ratings" component={Ratings} />
    <Route path="/recommendations" component={Recommendations} />
    <Route path="/:city" component={City} />
    <Route path="/:city/:brewery" component={Brewery} />
  </Route>
);
