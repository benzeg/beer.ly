//////////////////////////////////////////////////////////////////////////////////////////
// PendingJobItem.js
// ------------------
//
// This component is used to display an individual (pending) delivery job for selection
// by the delivery driver.
//
//////////////////////////////////////////////////////////////////////////////////////////

import React from 'react';

import { Text, View } from 'react-native';

import { Card } from 'react-native-material-ui';

import Styles from '../Styles.js';
import Container from './Container.js';

class PendingJobItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let job = this.props.jobInfo;

    let supplyAddressText = (job.supplyAddresses).join(',\n');
    return (
      <Card onPress={()=>this.props.onPress(job)}>
        <View style={{padding: 10}}> 
          <Text>
            <Text style={Styles.jobTitle}>Job ID:</Text>
            <Text style={Styles.jobText}> {job.id}</Text>
          </Text>
          <Text>
              <Text style={Styles.jobTitle}>Warehouses: {'\n'}</Text>
              <Text style={Styles.jobText}>{supplyAddressText}</Text>
          </Text>
          <Text>
            <Text style={Styles.jobTitle}>Delivery Address: {'\n'}</Text>
            <Text style={Styles.jobText}>{job.deliveryAddress}</Text>
          </Text>
        </View>
      </Card>
    );
  }
}

export default PendingJobItem;