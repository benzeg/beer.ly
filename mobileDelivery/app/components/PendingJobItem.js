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
    return (
      <Card onPress={()=>this.props.onPress(job)}>
        <View style={{padding: 10}}> 
          <Text>
            <Text style={Styles.jobTitle}>Job ID:</Text>
            <Text style={Styles.jobText}> {job.jobid}</Text>
          </Text>
          <Text>
              <Text style={Styles.jobTitle}>Warehouses: {'\n'}</Text>
              <Text style={Styles.jobText}>{job.supplyAddresses.join(',\n')}</Text>
          </Text>
          <Text>
            <Text style={Styles.jobTitle}>Delivery Address: {'\n'}</Text>
            <Text style={Styles.jotText}>{job.deliveryAddress}</Text>
          </Text>
        </View>
      </Card>
    );
  }
}

export default PendingJobItem;