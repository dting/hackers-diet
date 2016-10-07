import React, { PropTypes } from 'react';

import { WeightLogItem } from './';

const WeightLog = ({ data }) => (
  <div className="weight-log">
    {data.reverse().map(item => (<WeightLogItem key={item.id} item={item} />))}
  </div>
);

WeightLog.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default WeightLog;
