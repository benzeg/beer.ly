import React from 'react';
import { Text, Modal } from 'react-native';

import { ListItem } from 'react-native-material-ui';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';

class DeliveryStatusUpdateOptionsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => this.props.onStatusUpdate(null)}
        >

          <Dialog>
            <Dialog.Title><Text>Update Job Status</Text></Dialog.Title>
            <Dialog.Content>
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
                  primaryText: 'Enroute to Warehouse'
                }}
                onPress={()=>this.props.onStatusUpdate('Enroute to Warehouse')}
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
                onPress={()=>this.props.onStatusUpdate('Enroute to Customer')}
              />
              <ListItem
                divider
                centerElement={{
                  primaryText: 'Delivered to Customer'
                }}
                onPress={()=>this.props.onStatusUpdate('Delivered to Customer')}
              />

            </Dialog.Content>
            <Dialog.Actions>
              <DialogDefaultActions
                 actions={['Cancel']}
                 onActionPress={() => this.props.onStatusUpdate(null)}
              />
            </Dialog.Actions>
          </Dialog>

        </Modal>
    );
  }
}

DeliveryStatusUpdateOptionsList.defaultProps = {
  onStatusUpdate: function (newStatus) {
    console.warn('DeliveryStatusUpdateOptionsList: onStatusUpdate prop not passed, new state:', newStatus);
  }
};

DeliveryStatusUpdateOptionsList.propTypes = {
  onStatusUpdate: React.PropTypes.func
};

export default DeliveryStatusUpdateOptionsList;
