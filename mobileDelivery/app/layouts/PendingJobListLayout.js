import React from 'react';

import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';

import { Styles } from './Styles.js';

class PendingJobListLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <ScrollView>

          <Text> Hello </Text>
        </ScrollView>
      </View>
    );
  }
}

PendingJobListLayout.defaultProps = {
  jobList: [
    {
      id: 'testID123',
      supplyAddresses: ['1705 Mariposa St, San Francisco', '563 2nd St, San Francisco'],
      deliveryAddress: '555 Commercial Street, San Francisco',
      customerName: 'bob',
      customerPhoneNumber: '555-555-5555'
    },
    {
      id: 'testID124',
      supplyAddresses: ['563 2nd St, San Francisco', '1150 Howard St, San Francisco'],
      deliveryAddress: '555 Commercial Street, San Francisco',
      customerName: 'mary',
      customerPhoneNumber: '555-555-7777'
    }
  ]
};

export default PendingJobListLayout;
