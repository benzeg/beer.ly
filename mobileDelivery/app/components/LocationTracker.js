//////////////////////////////////////////////////////////////////////////////////////////
// GeoLocationTracker.js
// ------------------
//
// This component is used to encapsulate the code for obtaining the geoLocation of
// the device.
//
//////////////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import {Text} from 'react-native';

class GeoLocationTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    }

    // watchID is returned from geolocation.watchPosition
    // we need to keep it to "un-track" when the component unmounts
    this.watchID = null;
  }

  componentDidMount() {
    // Obtain an initial geolcation
    navigator.geolocation.getCurrentPosition(this.handlePositionUpdate);

    // Start tracking our geolocation
    this.watchID = navigator.geolocation.watchPosition(this.handlePositionUpdate, this.handlePositionUpdateFail, {
      enableHighAccuracy: true
    });
  }

  componentWillUnmount() {
    // Stop tracking our geolocation
    navigator.geolocation.clearWatch(this.watchID);
  }

  handlePositionUpdate = (newPosition) => {
    // console.warn('handlePositionUpdate', newPosition.coords);
    this.setState({
      latitude: newPosition.coords.latitude,
      longitude: newPosition.coords.longitude
    })

    // call any event handler passed by the parent components
    if (this.props.onLocationChange) {
      this.props.onLocationChange({
        latitude: newPosition.coords.latitude,
        longitude: newPosition.coords.longitude
      });
    }
  }

  handlePositionUpdateFail = (error) => {
    console.warn('handlePositionUpdateFail: ', error);
  }

  render() {
    return (
      <Text> Lat: {this.state.latitude.toFixed(4)} Long: {this.state.longitude.toFixed(4)} </Text>
    );
  }
}

export default GeoLocationTracker;
