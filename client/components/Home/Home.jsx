import React from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


class Home extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <div className={styles.intro}>
            Discover local beers, get beer recommendations, and have beer delivered!
            <div>
              <div><Link to="/login" className={styles.action}><u>Log In</u> </Link></div>
              <div><Link to="/signup" className={styles.action}><u>Sign Up</u></Link></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
