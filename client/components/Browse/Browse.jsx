import React from 'react';
import { browserHistory} from 'react-router';
import User from '../../global/user.js';

class Browse extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (User.location) {
      browserHistory.push('/' + User.location);
    } else {
      browserHistory.push('/login');
    }
  }

  render() {
    return (
      <div>
        Finding your city...
      </div>
    );
  }
}

export default Browse;
