import classnames from 'classnames';
import React, { PropTypes } from 'react';

import { WeightLogItem } from './';

const WeightLog = ({ actions, unit, weightReadings }) => (
  <div className="weight-log">
    <div className="unit-toggle">
      kg
      <button
        className={classnames(
          'unit-toggle-btn',
          { [`${unit}`]: true }
        )}
        onClick={actions.toggleUnits}
      />
      lbs
    </div>
    <div className="header">
      <div className="date cell">Date</div>
      <div className="weight cell">Weight</div>
      <div className="trend cell">Trend</div>
    </div>
    <div className="rows">
      {[...weightReadings].reverse().map((reading, idx) => (
        <WeightLogItem key={idx} item={reading} unit={unit} />
      ))}
    </div>
  </div>
);

WeightLog.propTypes = {
  actions: PropTypes.shape({}),
  unit: PropTypes.string,
  weightReadings: PropTypes.arrayOf(PropTypes.shape({})),
};

export default WeightLog;
