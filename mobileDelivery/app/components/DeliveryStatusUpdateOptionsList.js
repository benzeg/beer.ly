import React, { Component } from 'react';

import { ListItem } from 'react-native-material-ui';
import Container from './Container.js';

class DeliveryStatusUpdateOptionsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Container>
          <ListItem
            divider
            centerElement={{
              primaryText: 'Delivery Job Accepted'
            }}
            onPress={()=>this.props.onStatusUpdate('Delivery Job Accepted')}
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Enroute to Supply Warehouse'
            }}
            onPress={()=>this.props.onStatusUpdate('Enroute to Supply Warehouse')}
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Loading Goods'
            }}
            onPress={()=>this.props.onStatusUpdate('Loading Goods')}
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Enroute to Customer'
            }}
            onPress={()=>this.props.onStatusUpdate('Enroute to Customerd')}
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Delivered to Customer'
            }}
            onPress={()=>this.props.onStatusUpdate('Delivered to Customer')}
          />
        </Container>
    );
  }
}

DeliveryStatusUpdateOptionsList.defaultProps = {
  onStatusUpdate: function(newStatus) {
    console.warn('DeliveryStatusUpdateOptionsList: onStatusUpdate prop not passed, new state:', newStatus);
  }
};

export default DeliveryStatusUpdateOptionsList;
