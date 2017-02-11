import React, { PropTypes } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import styles from './Delivery.css';
import { googleMapsAPIEmbedKey } from '../../../server/config/apiKeys';

const deliveryStatusShowMap = [
  'Delivery Job Accepted',
  'Enroute to Warehouse',
  'Loading Goods',
  'Enroute to Customer',  
];

class Delivery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryStatus: 'fetching...'
    };

    this.getDeliveryStatus = this.getDeliveryStatus.bind(this);
  }

  componentDidMount() {
    this.getDeliveryStatus();
    this.refreshID = setInterval(this.getDeliveryStatus, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshID);
  }

  getDeliveryStatus() {
    const context = this;

    // let fakeData = {
    //   deliveryStatus: 'Enroute to Customer',
    //   latitude: 37.78825,
    //   longitude: -122.4324
    // };

    // context.handleSuccess(fakeData);

    axios({
      method: 'get',
      url: 'user/status'
    })
    .then((response) => {
      context.handleSuccess(response.data);
    })
    .catch((thrown) => {
      context.handleError(thrown);
    });
  }

  handleSuccess(data) {
    this.setState({
      deliveryStatus: data.deliveryStatus,
      latitude: data.latitude,
      longitude: data.longitude
    });
  }

  handleError(error) {
    console.log('Error: ', error);
    browserHistory.push('/login');
  }

  render() {
    // construct query string for Google Embed API using the driver's current latitude / longitude
    let googleMapsURL = 'https://www.google.com/maps/embed/v1/place'
                      + '?key=' + googleMapsAPIEmbedKey
                      + '&q= ' + this.state.latitude + ',' + this.state.longitude;
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>Your Delivery Status</h1>
          <p className={styles.details}>Status: <strong>{this.state.deliveryStatus}</strong></p>
        </div>
        { deliveryStatusShowMap.includes(this.state.deliveryStatus) &&
          (<div>
            <p>Your driver's location:</p>
            <iframe
              width="600"
              height="450"
              frameBorder="0"
              src={googleMapsURL} allowFullScreen>
            </iframe>
          </div>)
        }
      </div>
    );
  }
}

// Beers.propTypes = {
//   params: React.PropTypes.object,
//   cart: React.PropTypes.array,
//   inCheckout: React.PropTypes.bool,
//   checkout: React.PropTypes.func,
//   addToCart: React.PropTypes.func,
//   removeFromCart: React.PropTypes.func
// };

export default Delivery;