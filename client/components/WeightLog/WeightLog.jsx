import React, { PropTypes } from 'react';

import { WeightLogItem } from './';

const WeightLog = ({ data }) => (
  <div className="weight-log">
    <div className="header">
      <div className="date cell">Date</div>
      <div className="weight cell">Weight</div>
      <div className="trend cell">Trend</div>
    </div>
    <div className="rows">
      {data.reverse().map(item => (<WeightLogItem key={item.id} item={item} />))}
    </div>
  </div>
);

WeightLog.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default WeightLog;
