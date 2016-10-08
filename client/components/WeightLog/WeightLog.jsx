import classnames from 'classnames';
import React, { PropTypes } from 'react';

import { WeightLogItem } from './';

const WeightLog = ({ actions: { toggleUnits }, unit, weights }) => (
  <div className="weight-log">
    <div className="unit-toggle">
      kg
      <button
        className={classnames(
          'unit-toggle-btn',
          { [`${unit}`]: true }
        )}
        onClick={toggleUnits}
      />
      lbs
    </div>
    <div className="header">
      <div className="date cell">Date</div>
      <div className="weight cell">Weight</div>
      <div className="trend cell">Trend</div>
    </div>
    <div className="rows">
      {[...weights].reverse().map((weight, idx) => (
        <WeightLogItem key={idx} item={weight} unit={unit} />
      ))}
    </div>
  </div>
);

WeightLog.propTypes = {
  actions: PropTypes.shape({}),
  unit: PropTypes.string,
  weights: PropTypes.arrayOf(PropTypes.shape({})),
};

export default WeightLog;
