import React, { PropTypes } from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import Cart from '../Cart/Cart';
import styles from './NavBar.css';
import User from '../../global/user';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    axios({
      method: 'get',
      url: 'auth/user/signout',
    })
    .then((response) => {
      for (let field in User) {
        User[field] = undefined;
      }
      browserHistory.push('/login');
    })
    .catch((thrown) => {
      console.log('Error: ', thrown);
    });
  }

  render() {
    const isHomePage = this.props.location.pathname === '/';
    const logo = isHomePage ? styles.lightLogo : styles.logo;
    const cart = isHomePage ? null : <Cart cart={this.props.cart} location={this.props.location.pathname}/>;
    const navbar = isHomePage ? styles.transparentNavbar : styles.navbar;

    return (
        <nav className={navbar}>
          <h1>
            <Link to="/" className={logo}>Beer.ly</Link>
          </h1>
          <h1>
            <Link to="/browse">Browse</Link>
          </h1>
          <h1>
            <Link to="/ratings">Ratings</Link>
          </h1>
          <h1>
            <Link to="/">Recommendations</Link>
          </h1>
          <h1>
            <Link to="/">Delivery</Link>
          </h1>
          <h1 onClick={this.handleSignout}>
            Signout
          </h1>
          <ul>
            <li>
              {cart}
            </li>
          </ul>
        </nav>
    );
  }
}

Nav.propTypes = {
  location: PropTypes.object.isRequired,
  cart: PropTypes.array
};

export default Nav;
