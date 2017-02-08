import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import styles from './Signup.css';

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

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.formFields = {};

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
  }

  handleFormSubmit() {
    let newUserInformation = {};

    for (let field in this.formFields) {
      newUserInformation[field] = this.formFields[field];
    }

    axios.post('signup', JSON.stringify(newUserInformation))
      .then((response) => {
        // redirect to login
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
            <h1>Sign up!</h1>
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
            <div>
              <TextField
                floatingLabelText= "phone number"
                name="phone"
                onChange={this.handleInputFieldChange}
                inputStyle={inlineStyles.inputStyle}
                underlineFocusStyle={inlineStyles.underlineStyle}
                floatingLabelStyle={inlineStyles.floatingLabelStyle}   
                fullWidth={true}  
              />
            </div>
            <div>
              <TextField
                floatingLabelText= "location"
                name="location"
                onChange={this.handleInputFieldChange}
                inputStyle={inlineStyles.inputStyle}
                underlineFocusStyle={inlineStyles.underlineStyle}
                floatingLabelStyle={inlineStyles.floatingLabelStyle}   
                fullWidth={true}  
              />
            </div>
            <RaisedButton label="Submit" style={inlineStyles.buttonStyle}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;