import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

import BeerList from '../BeerList/BeerList';
import BeerCart from '../BeerCart/BeerCart';
import Checkout from '../Checkout/Checkout';
import styles from './Recommendations.css';

import User from '../../global/user';
import fakedata from './fakedata.js';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: []
    };
  }

  componentDidMount() {
    this.fetchRecommendedBeers();
  }

  fetchRecommendedBeers() {
    const context = this;

    // use dummy data for testing
    context.handleSuccess(fakedata);

    // if (!User.username) {
    //   browserHistory.push('/login');
    // } else {
    //   axios({
    //     method: 'get',
    //     url: 'user/recommendations',
    //     data: JSON.stringify({username: User.username}),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then((response) => {
    //     context.handleSuccess(response.data);
    //   })
    //   .catch((thrown) => {
    //     context.handleError(thrown);
    //   });
    // }
  }

  handleSuccess(beers) {
    this.setState({
      beers: beers
    });
  }

  handleError(error) {
    console.log(error);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>Beers You Might Like</h1>
          <p className={styles.details}>Recommendations based on your personal beer ratings.</p>
        </div>
        <div>
          {this.props.cart.length > 0 ? <BeerCart beers={this.props.cart} removeFromCart={this.props.removeFromCart} inCheckout={this.props.inCheckout} checkout={this.props.checkout} /> : null}
          {this.props.inCheckout ?
            <Checkout />
            : <BeerList beers={this.state.beers} addToCart={this.props.addToCart} />
          }
        </div>
      </div>
    );
  }
}

Recommendations.propTypes = {
  params: React.PropTypes.object,
  cart: React.PropTypes.array,
  inCheckout: React.PropTypes.bool,
  checkout: React.PropTypes.func,
  addToCart: React.PropTypes.func,
  removeFromCart: React.PropTypes.func
};

export default Recommendations;