import React from 'react';

import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

import { ListItem } from 'react-native-material-ui';

import MapView from 'react-native-maps';

import Styles from '../Styles.js';
import Container from '../components/Container.js';

class ActiveJobDashBoardLayout extends React.Component {
  constructor(props) {
    super(props);
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

ActiveJobDashBoardLayout.defaultProps = {
  location: {
    latitude: 37.78825,
    longitude: -122.4324
  },
  deliveryStatus: 'No Active Job',
  onJobStatusUpdateClick: (text) => console.warn('No onPress handler prop defined:', text)
};

export default ActiveJobDashBoardLayout;
