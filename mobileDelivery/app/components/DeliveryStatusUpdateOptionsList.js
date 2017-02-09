import React from 'react';
import { View, Text, Modal } from 'react-native';
import { StyleSheet } from 'react-native';

import { ListItem } from 'react-native-material-ui';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 25,
  },

  modal: {

  }
});

class DeliveryStatusUpdateOptionsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => this.props.onStatusUpdate(null)}
          style={styles.modal}
        >
        
          <Dialog>
            <Dialog.Title><Text>Change Job Status</Text></Dialog.Title>
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
                 onActionPress={text => this.props.onStatusUpdate(null)}
              />
            </Dialog.Actions>
          </Dialog>
        
        </Modal>
      </View>
    );
  }
}

DeliveryStatusUpdateOptionsList.defaultProps = {
  onStatusUpdate: function(newStatus) {
    console.warn('DeliveryStatusUpdateOptionsList: onStatusUpdate prop not passed, new state:', newStatus);
  }
};

export default DeliveryStatusUpdateOptionsList;
