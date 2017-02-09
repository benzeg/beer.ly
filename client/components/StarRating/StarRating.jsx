import React, { PropTypes } from 'react';
import { Rating } from 'material-ui-rating';

class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: (props.startingValue) ? props.startingValue : 0,
      readOnly: false,
      max: 4
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value
    });

    this.props.onClick(value);
  }

  render() {
    return (
      <Rating value={this.state.value} max={this.state.max} readOnly={this.state.readOnly} onChange={this.handleChange} />
    );
  }
}

StarRating.propTypes = {
  onClick: PropTypes.func,
  startingValue: PropTypes.number
};

export default StarRating;