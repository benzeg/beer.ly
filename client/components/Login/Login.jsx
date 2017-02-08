import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory, Link } from 'react-router';
import axios from 'axios';
import styles from './Login.css';
import user from '../../global/user.js';

const inlineStyles = {
  inputStyle: {
    color: '#FFF',
  },
  underlineStyle: {
    borderColor: '#FFF',
  },
  floatingLabelStyle: {
    color: '#FFF',
    'fontSize': '18px',
  },
  floatingLabelFocusStyle: {
    color: '#FFF',
  },
  buttonStyle: {
    'margin-top': '30px'
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.formFields = {};

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
  }

  handleFormSubmit() {
    let userInformation = {};

    for (let field in this.formFields) {
      userInformation[field] = this.formFields[field];
    }

    axios.post('auth/user/signin', JSON.stringify(userInformation))
      .then((response) => {
        if (response.status === 200) {      
          let user = JSON.parse(response.data);

          for (let field in user) {
            user[field] = userInformation[field];
          }
          browserHistory.push('/' + user.location);
        } else {
          browserHistory.push('/login');
        }
      })
      .catch((thrown) => {
        console.log('Error: ', thrown);
      });
  }

  // Event handler to populate all values into the formFields object
  // for later use by handleFormSubmit()
  handleInputFieldChange(event) {
    this.formFields[event.target.name] = event.target.value;
  }

  render() {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <div className={styles.form}>
            <h1>Login</h1>
            <div>
              <TextField
                floatingLabelText= "username"
                name="username"
                onChange={this.handleInputFieldChange}
                inputStyle={inlineStyles.inputStyle}
                underlineFocusStyle={inlineStyles.underlineStyle}
                floatingLabelStyle={inlineStyles.floatingLabelStyle} 
                fullWidth={true}  
              />
            </div>
            <div>
            <TextField
                floatingLabelText= "password"
                name="password"
                onChange={this.handleInputFieldChange}
                inputStyle={inlineStyles.inputStyle}
                underlineFocusStyle={inlineStyles.underlineStyle}
                floatingLabelStyle={inlineStyles.floatingLabelStyle}   
                fullWidth={true}  
              />
            </div>
            <RaisedButton label="Submit" style={inlineStyles.buttonStyle}/>
            <p>New user? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;