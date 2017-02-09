import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import styles from './BeerItem.css';
import StarRating from '../StarRating/StarRating';

import User from '../../global/user';

const mockImages = [
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer1.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer2.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer3.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer4.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer5.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer6.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer7.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer8.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer9.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer10.png'
];

class BeerItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
  }

  handleClick() {
    const beer = {
      name: this.props.beer.name,
      image: mockImages[this.props.beer.style.id % mockImages.length]
    };
    this.props.addToCart(beer);
  }

  handleRatingSubmit(value) {
    console.log('Clicked with value: ' + value);

    // if (!User.username) {
    //   browserHistory.push('/login');
    // } else {
    //   let ratingDetails = {
    //     username: User.username,
    //     rating: value,
    //     product: this.props.beer
    //   };
    //   axios({
    //     method: 'post',
    //     url: 'user/ratings',
    //     data: JSON.stringify(ratingDetails),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then((response) => {
    //     console.log('rating saved to database successfully');
    //   })
    //   .catch((thrown) => {
    //     console.log('Error: ', thrown);
    //     browserHistory.push('/login');
    //   });
    // }
  }

  render() {
    // Handles situation when brewery does not supply information
    const abvHandler = () => {
      return (this.props.beer.abv) ?
        (<strong className={styles.abv}>{this.props.beer.abv}% ALC/VOL</strong>) :
        (<strong className={styles.abv}>7.25% ALC/VOL</strong>);
    };

    const descriptionHandler = () => {
      return (this.props.beer.description) ?
        (<p className={styles.description}>{this.props.beer.description.substring(0, 60)}...</p>) :
        (<p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...</p>);
    };

    return (
      <div className={styles.cell}>
        <div className={styles.title}>
          {this.props.beer.name}
        </div>
        <img src={mockImages[this.props.beer.style.id % mockImages.length]} className={styles.image} />
        { /* Optional information handlers */ }
        { abvHandler() } { descriptionHandler() }
        <button className={styles.addButton} onClick={this.handleClick} >Add to Flight</button>
        <StarRating startingValue={this.props.beer.rating ? this.props.beer.rating : 0} onClick={this.handleRatingSubmit}/>
      </div>
    );
  }
}

BeerItem.propTypes = {
  beer: PropTypes.object
};


export default BeerItem;
