import React, { PropTypes } from 'react';
import moment from 'moment';

const WeightLogItem = props => (
  <div className="row">
    <div className="cell">{moment(props.item.time).format('MMM DD, YYYY')}</div>
    <div className="cell">{`${props.item.weight.toFixed(1)} ${props.item.unit}`}</div>
  </div>
);

WeightLogItem.propTypes = {
  item: PropTypes.shape({
    time: PropTypes.number,
    weight: PropTypes.number,
    unit: PropTypes.string,
  }),
};

export default WeightLogItem;
