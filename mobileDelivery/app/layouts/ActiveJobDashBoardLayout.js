import React from 'react';
import axios from 'axios';

import { Dimensions, Linking } from 'react-native';
import { ListItem } from 'react-native-material-ui';
import { ActionButton } from 'react-native-material-ui';

import MapView from 'react-native-maps';

import update from 'immutability-helper';

import Container from '../components/Container.js';

import { SERVER_ADDRESS, USERNAME, PASSWORD } from '../config/ServerConfig.js';
import { GOOGLEMAP_APIKEY } from '../config/APIKeys.js';
import PolylineDecoder from '../lib/PolylineDecoder.js';

class ActiveJobDashBoardLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationRoute: [],
      warehouseAddressLocations: {}
    };

    this.oldLatitude = 0;
    this.oldLongitude = 0;

    this.userLatitudeDelta = 0.005;
    this.userLongitudeDelta = 0.005;
  }

  componentWillMount() {
    // this.drivingRouteRefreshID = setInterval(()=> this.updateDrivingRoute(), 2000);

    // Geocode the warehouse addresses
    for (let i = 0; i < this.props.job.supplyAddresses.length; i++) {
      let address = this.props.job.supplyAddresses[i];

      if (this.state.warehouseAddressLocations[address] === undefined) {

        let geocodingRequestURL = 'https://maps.googleapis.com/maps/api/geocode/json?' +
          'address=' + address +
          '&key=' + GOOGLEMAP_APIKEY;

        // Call Google Server
        axios({
          method: 'post',
          url: geocodingRequestURL,
          data: {
          }
        }).then((response) => {
          let newAddressLocationPair = {};
          newAddressLocationPair[address] = response.data.results[0].geometry.location;

          let newState = update(this.state, {
            warehouseAddressLocations: {$merge: newAddressLocationPair}
          });

          this.setState(newState);

        }).catch(function(error) {
          console.log(error);
        });
      }
    }

  }

  componentWillUnmount() {
    clearInterval(this.drivingRouteRefreshID);
  }

  updateDrivingRoute() {
    // Only update if the latitude and longitiude has changed, this minimised unneeded calls to
    // Google Directino API
    if (this.oldLongitude === this.props.location.longitude &&
        this.oldLatitude === this.props.location.latitude) {
      return;
    }

    // Construct the Google Direction API request with query string
    const directionRequestURL = 'https://maps.googleapis.com/maps/api/directions/json?' +
       'origin=' + this.props.location.latitude.toFixed(7) + ',' + this.props.location.longitude.toFixed(7) +
       '&destination=' + this.props.job.deliveryAddress +
       '&waypoints=optimize:true|' + this.props.job.supplyAddresses.join('|') +
       '&key=' + GOOGLEMAP_APIKEY;

    // Starting the call
    axios({
      method: 'post',
      url: directionRequestURL,
      data: {
      }
    }).then((response) => {
      console.log(response.data);

      if (response.data.routes !== undefined) {
        this.setState({
          navigationRoute: PolylineDecoder(response.data.routes[0].overview_polyline.points)
        });
      }

      // Save the location as the 'old' location value for future comparison
      this.oldLatitude = this.props.location.latitude;
      this.oldLongitude = this.props.location.longitude;

    }).catch(function(error) {
      // console.log('Error, updateDrivingRoute:', error);
    });
  }

  handleRegionChange = (region) => {
    this.userLatitudeDelta = region.latitudeDelta;
    this.userLongitudeDelta = region.longitudeDelta;
  }

  handlePhoneCustomer = () => {
    Linking.openURL('tel:' + this.props.job.customerPhoneNumber);
  }

  render() {
    return (
      <Container>
        <MapView
          initialRegion={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: this.userLatitudeDelta,
            longitudeDelta: this.userLongitudeDelta,
          }}

          region={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: this.userLatitudeDelta,
            longitudeDelta: this.userLongitudeDelta,
          }}

          onRegionChange={this.handleRegionChange}

          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - 140,
          }}
        >

          <MapView.Marker coordinate={{latitude: this.props.location.latitude, longitude: this.props.location.longitude}} />

          {this.props.job.supplyAddresses.map((address, index) => {
            if (this.state.warehouseAddressLocations[address]) {
              return <MapView.Marker key={index} pinColor={'#0f0'} coordinate={{latitude: this.state.warehouseAddressLocations[address].lat, longitude: this.state.warehouseAddressLocations[address].lng}} />;
            }

            return null;
          })}

          {/* Pins on supply warehouses */}
          {this.state.navigationRoute.length > 1 &&
            <MapView.Polyline
            coordinates={this.state.navigationRoute}
            strokeWidth={5}
            strokeColor={'#f00'}
            />
          }

        </MapView>

        <ListItem
          divider
          centerElement={{
            primaryText: this.props.deliveryStatus
          }}
          onPress={()=>this.props.onJobStatusUpdateClick(this.props.deliveryStatus)}
        />

        <ActionButton icon="phone" onPress={this.handlePhoneCustomer} />

      </Container>
    );
  }
}

ActiveJobDashBoardLayout.propTypes = {
  job: React.PropTypes.object,
  location: React.PropTypes.object,
  onJobStatusUpdateClick: React.PropTypes.func,
  deliveryStatus: React.PropTypes.string
};

ActiveJobDashBoardLayout.defaultProps = {
  location: {
    latitude: 37.78825,
    longitude: -122.4324
  },
  deliveryStatus: 'No Active Job',
  onJobStatusUpdateClick: (text) => console.warn('No onPress handler prop defined:', text)
};

export default ActiveJobDashBoardLayout;
