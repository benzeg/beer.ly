///////////////////////////////////////////////////////////////////////
// RemoveWarehouseWaypointList Component
//
// This is a "modal" component that is used by the deliery driver
// to remove a particular warehouse address 'waypoint' from the list
//
///////////////////////////////////////////////////////////////////////

import React from 'react';
import { Text, Modal } from 'react-native';

import { ListItem } from 'react-native-material-ui';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';

class RemoveWarehouseWaypointList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => this.props.onArrivedAtWarehouse(null)}
        >

          <Dialog>
            <Dialog.Title><Text>Arrived At Warehouse</Text></Dialog.Title>
            <Dialog.Content>
              {this.props.supplyAddresses.map((address, index) => {
                return (
                  <ListItem
                    divider
                    key={address + index}
                    centerElement={{
                      primaryText: address
                    }}
                    onPress={()=>this.props.onArrivedAtWarehouse(address)}
                  />
                );
              })}
            </Dialog.Content>
            <Dialog.Actions>
              <DialogDefaultActions
                 actions={['Cancel']}
                 onActionPress={() => this.props.onArrivedAtWarehouse(null)}
              />
            </Dialog.Actions>
          </Dialog>

        </Modal>
    );
  }
}

RemoveWarehouseWaypointList.propTypes = {
  supplyAddresses: React.PropTypes.array,
  onArrivedAtWarehouse: React.PropTypes.func
};

export default RemoveWarehouseWaypointList;