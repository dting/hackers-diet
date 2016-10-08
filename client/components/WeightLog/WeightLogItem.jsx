import React, { PropTypes } from 'react';
import moment from 'moment';

const WeightLogItem = props => (
  <div className="row">
    <div className="cell date">{moment(props.item.time).format('MMM DD, YYYY')}</div>
    <div className="cell weight">{`${props.item.weight.toFixed(1)} ${props.unit}`}</div>
    <div className="cell trend">{`${props.item.trend.toFixed(1)} ${props.unit}`}</div>
  </div>
);

WeightLogItem.propTypes = {
  unit: PropTypes.string.isRequired,
  item: PropTypes.shape({
    time: PropTypes.number,
    weight: PropTypes.number,
    trend: PropTypes.number,
  }),
};

export default WeightLogItem;
