import React from 'react';

import { View } from 'react-native';
import { ScrollView } from 'react-native';

import { Toolbar } from 'react-native-material-ui';

import PendingJobItem from '../components/PendingJobItem.js';

import { PendingJobTestData } from '../testdata/TestData.js';

class PendingJobListLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Toolbar centerElement="Pending Jobs" />
        <ScrollView>
          {this.props.jobList.map(job => (<PendingJobItem key={job.jobid} jobInfo={job} onPress={this.props.onJobPress} />))}
        </ScrollView>
      </View>
    );
  }
}

PendingJobListLayout.propTypes = {
  onJobPress: React.PropTypes.func,
  jobList: React.PropTypes.array
};

PendingJobListLayout.defaultProps = {
  onJobPress: job => console.warn('PendingJobListLayout, no onJobPress prop defined: job object', job),
  jobList: PendingJobTestData
};

export default PendingJobListLayout;
