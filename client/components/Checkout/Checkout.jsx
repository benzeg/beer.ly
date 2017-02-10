import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import styles from './Checkout.css';

class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.formFields = {};
    this.state = this.getInitialState();

    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getInitialState() {
    return {
      submitDisabled: false,
      paymentComplete: false
    };
  }

  // Event handler to populate all values into the formFields object
  // for later use by onSubmit()
  handleInputFieldChange(event) {
    this.formFields[event.target.name] = event.target.value;
  }

  onSubmit(event) {
    // prevent standard HTML form submission
    event.preventDefault();
    
    // prevent duplicate charges by disabling submit button
    this.setState({ submitDisabled: true});

    let deliveryAddress = this.formFields.address
      + this.formFields.city
      + this.formFields.state
      + this.formFields.zipcode
      + this.formFields.country;

    let breweryIDs = this.cart.map((beer) => beer.breweries[0].id);

    let postData = {
      deliveryAddress: deliveryAddress,
      breweryIDs: breweryIDs
    };

    // send form here
    axios({
      method: 'post',
      url: '/user/status',
      data: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      this.setState({ paymentComplete: true});
    })
    .catch((error) => {
      console.log('Error: ', error);
      browserHistory.push('/login');
    });
  }

  render() {
    if (this.state.paymentComplete) {
      return (
        <div className={styles.wrapper}>
          <div>Payment Complete!</div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper}>
          <form onSubmit={this.onSubmit} >
            <div className={styles.flexRow}>
              <div className={styles.flexItem}>
                <h2 className={styles.section}>Delivery Address</h2>
                <input className={styles.input} type="text" name="name" placeholder="Name" onChange={this.handleInputFieldChange} /><br />
                <input className={styles.input} type="text" name="address" placeholder="Address" onChange={this.handleInputFieldChange} /><br />
                <input className={styles.input} type="text" name="city" placeholder="City" onChange={this.handleInputFieldChange} /><br />
                <input className={styles.input} type="text" name="state" placeholder="State" onChange={this.handleInputFieldChange} /><br />
                <input className={styles.input} type="text" name="zipcode" placeholder="Zipcode" onChange={this.handleInputFieldChange} /><br />
                <input className={styles.input} type="text" name="country" placeholder="Country" onChange={this.handleInputFieldChange} /><br />
              </div>

              <div className={styles.flexItem}>
                <h2 className={styles.section}>Payment Method</h2>
                <input className={styles.input} type="text" name="cardNumber" placeholder="Credit Card Number" onChange={this.handleInputFieldChange} /><br />
                <input className={styles.input} type="text" name="expMonth" placeholder="Expiration Month" onChange={this.handleInputFieldChange} /><br />
                <input className={styles.input} type="text" name="expYear" placeholder="Expiration Year" onChange={this.handleInputFieldChange} /><br />
                <input className={styles.input} type="text" name="CVC" placeholder="CVC" onChange={this.handleInputFieldChange} /><br />

                <input className={styles.submit} disabled={this.state.submitDisabled} type="submit" value="Purchase" />
              </div>
            </div>
          </form>
        </div>
      );
    }
  }

}

export default Checkout;
