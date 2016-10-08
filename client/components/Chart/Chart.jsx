import React, { PropTypes } from 'react';
import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { spanGaps, formatters } from '../../modules/util/util.chart';

const Chart = (props) => {
  const { data, ticks, unit } = spanGaps(props.data);
  return (
    <div className="chart">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 15, right: 30, bottom: 30, left: 20 }}
        >
          <Brush dataKey="name" height={15} stroke="#3186e4" />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            activeDot={{ r: 7 }}
            dataKey="weight"
            dot={{ stroke: '#3186e4', fill: '#3186e4' }}
            stroke="#3186e4"
          />
          <Line
            activeDot={{ r: 5 }}
            dataKey="trend"
            dot={false}
            stroke="#00AB77"
            type="monotoneX"
          />
          <Tooltip
            formatter={formatters.weight(unit)}
            labelFormatter={formatters.tooltipDate}
          />
          <XAxis
            dataKey="time"
            minTickGap={-10}
            padding={{ left: 15, right: 15 }}
            tickCount={ticks.length}
            tickFormatter={formatters.axisDate}
            ticks={ticks}
          />
          <YAxis
            dataKey="weight"
            domain={['auto', 'auto']}
            tick={{ dx: -5 }}
            tickFormatter={formatters.weight(unit)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Chart;
