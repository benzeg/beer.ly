import React from 'react';
import axios from 'axios';

import { Dimensions } from 'react-native';
import { ListItem } from 'react-native-material-ui';
import MapView from 'react-native-maps';

import Container from '../components/Container.js';

import { SERVER_ADDRESS, USERNAME, PASSWORD } from '../config/ServerConfig.js';
import { GOOGLEMAP_APIKEY } from '../config/APIKeys.js';
import PolylineDecoder from '../lib/PolylineDecoder.js';

class ActiveJobDashBoardLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationRoute: []
    };

    this.oldLatitude = 0;
    this.oldLongitude = 0;
  }

  componentWillMount() {
    this.drivingRouteRefreshID = setInterval(()=> this.updateDrivingRoute(), 2000);
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
      this.setState({
        navigationRoute: PolylineDecoder(response.data.routes[0].overview_polyline.points)
      });

      // Save the location as the 'old' location value for future comparison
      this.oldLatitude = this.props.location.latitude;
      this.oldLongitude = this.props.location.longitude;

    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Container>
        <MapView
          initialRegion={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}

          region={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}

          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - 140,
          }}
        >

          <MapView.Marker coordinate={{latitude: this.props.location.latitude, longitude: this.props.location.longitude}} />

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
