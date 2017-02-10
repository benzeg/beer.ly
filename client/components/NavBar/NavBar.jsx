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
          { !isHomePage ?
            <h1>
              <Link to="/browse" className={styles.navItem}>Browse</Link>
            </h1>
          : <span></span>}
          { !isHomePage ?
            <h1>
              <Link to="/ratings" className={styles.navItem}>My Ratings</Link>
            </h1>
          : <span></span>}
          { !isHomePage ?
            <h1>
              <Link to="/recommendations" className={styles.navItem}>Recommendations</Link>
            </h1>
          : <span></span>}
          { !isHomePage ?
            <h1>
              <Link to="/" className={styles.navItem}>Delivery</Link>
            </h1>
          : <span></span>}
          { !isHomePage ?
            <h1 className={styles.navItem} onClick={this.handleSignout}>
              Signout
            </h1>
          : <span></span>}
          { !isHomePage ?
            <ul>
              <li>
                {cart}
              </li>
            </ul>
          : <span></span>}
        </nav>
    );
  }
}

Nav.propTypes = {
  location: PropTypes.object.isRequired,
  cart: PropTypes.array
};

export default Nav;
