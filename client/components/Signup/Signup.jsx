import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory, Link } from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import styles from './Signup.css';
import user from '../../global/user.js';

const CancelToken = axios.CancelToken;

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

    this.state = {
      dataSource: []
    };

    this.autoComplete = _.debounce(this.fetchCities, 300);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount = () => {
    this.source = CancelToken.source();
  }

  componentWillUnmount = () => {
    this.source.cancel();
  }

  handleFormSubmit() {
    let newUserInformation = {};

    for (let field in this.formFields) {
      newUserInformation[field] = this.formFields[field];
    }

    newUserInformation.location = this.location;

    axios.post('/auth/user/signup', JSON.stringify(newUserInformation))
      .then((response) => {
        if (response.status === 200) {
          browserHistory.push('/' + newUserInformation.location);
        } else {
          browserHistory.push('/signup');
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

  handleLocationChange(inputValue) {
    this.location = inputValue;
    this.autoComplete(inputValue);
  }

  fetchCities(inputValue) {
    if (inputValue === '') {
      this.setState({ dataSource: [] });
      return;
    }

    const context = this;
    axios.get('api/locations/' + inputValue, {cancelToken: this.source.token})
      .then((response) => {
        const cities = this.handleCitiesSuccess(response);
        context.setState({ dataSource: cities });
      })
      .catch((thrown) => {
        if (!axios.isCancel(thrown)) {
          console.log('Error: ', thrown);
        }
      });
  }

  handleCitiesSuccess(response) {
    return response.data.predictions.map((city) => {
      return city.structured_formatting.main_text;
    });
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
                name="phonenumber"
                onChange={this.handleInputFieldChange}
                inputStyle={inlineStyles.inputStyle}
                underlineFocusStyle={inlineStyles.underlineStyle}
                floatingLabelStyle={inlineStyles.floatingLabelStyle}   
                fullWidth={true}  
              />
            </div>
            <div>
              <AutoComplete
                floatingLabelText="your city"
                name="location"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleLocationChange}
                filter={() => true}
                inputStyle={inlineStyles.inputStyle}
                underlineFocusStyle={inlineStyles.underlineStyle}
                floatingLabelStyle={inlineStyles.floatingLabelStyle}
                fullWidth={true}
              />
            </div>
            <RaisedButton label="Submit" onClick={this.handleFormSubmit} style={inlineStyles.buttonStyle}/>
            <p>Already a user? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;