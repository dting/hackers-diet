import React, { PropTypes } from 'react';
import {
  Brush,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { spanGaps, formatters } from '../../modules/util/util.chart';

const Chart = ({ weightReadings, unit }) => {
  const { data, ticks } = spanGaps(weightReadings);
  return (
    <div className="chart">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
        >
          <Brush
            dataKey="time"
            height={15}
            stroke="#3186e4"
            tickFormatter={formatters.axisDate}
          />
          <Legend
            align={'right'}
            height={20}
            layout={'vertical'}
            verticalAlign="top"
          />
          <Line
            activeDot={{ stroke: '#3186e4', fill: 'none', r: 6 }}
            dataKey="weight"
            dot={{ stroke: '#3186e4', fill: '#3186e4' }}
            stroke="#3186e4"
            strokeDasharray="0 1"
          />
          <Line
            activeDot={{ stroke: '#00AB77', fill: 'none', r: 3 }}
            connectNulls
            dataKey="trend"
            dot={false}
            stroke="#00AB77"
            type="linear"
          />
          <Tooltip
            formatter={formatters.weight(unit)}
            labelFormatter={formatters.tooltipDate}
          />
          <XAxis
            dataKey="time"
            minTickGap={10}
            padding={{ left: 20, right: 20 }}
            tickCount={ticks.length}
            tickFormatter={formatters.axisDate}
            ticks={ticks}
          />
          <YAxis
            dataKey="weight"
            domain={['auto', 'auto']}
            padding={{ top: 20, bottom: 20 }}
            tick={{ dx: -5 }}
            tickFormatter={formatters.weight(unit)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

Chart.propTypes = {
  weightReadings: PropTypes.arrayOf(PropTypes.shape({})),
  unit: PropTypes.string,
};

export default Chart;
