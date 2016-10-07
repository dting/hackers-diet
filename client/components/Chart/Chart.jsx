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
import { scaleTime } from 'd3-scale';
import { timeDay } from 'd3-time';
import moment from 'moment';

/** Fill in gaps in time series data (https://github.com/recharts/recharts/issues/252) */
const getTicksData = (data, ticks) => {
  if (!data || !data.length) { return []; }

  const dataMap = new Map(data.map(i => [i.time, i]));
  ticks.forEach((item) => {
    if (!dataMap.has(item)) {
      data.push({ time: item });
    }
  });
  return data.sort((a, b) => a.time - b.time);
};

const addMissingTrends = (data) => {
  let trend;
  return data.map((item) => {
    trend = item.trend || trend;
    return { ...item, trend };
  });
};

const getTicks = (data) => {
  if (!data || !data.length) { return []; }

  const domain = [new Date(data[0].time), new Date(data[data.length - 1].time)];
  const scale = scaleTime().domain(domain).range([0, 1]);
  const ticks = scale.ticks(timeDay, 1);

  return ticks.map(entry => +entry);
};

/** Formatters **/
const axDateFormatter = function axDateFormat(time) {
  return moment(time).format('MMM DD');
};
const ttDateFormatter = function ttDateFormatter(time) {
  return moment(time).format('MMM DD, YYYY');
};
const weightFormatter = function weightFormater(unit) {
  return weight => `${weight.toFixed(1)} ${unit}`;
};

const Chart = (props) => {
  const ticksArr = getTicks(props.data);
  const completeData = addMissingTrends(getTicksData(props.data, ticksArr));
  const unit = (completeData[0] || {}).unit || '';
  return (
    <div className="chart">
      <ResponsiveContainer>
        <LineChart
          data={completeData}
          margin={{ top: 15, right: 30, bottom: 30, left: 20 }}
        >
          <Brush dataKey="name" height={15} stroke="#3186e4" />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            dataKey="weight"
            stroke="#3186e4"
            dot={{ stroke: '#3186e4', fill: '#3186e4' }}
            activeDot={{ r: 7 }}
          />
          <Line
            dataKey="trend"
            stroke="#00AB77"
            dot={false}
            activeDot={{ r: 5 }}
            type="monotoneX"
          />
          <Tooltip labelFormatter={ttDateFormatter} formatter={weightFormatter(unit)} />
          <XAxis
            dataKey="time"
            minTickGap={-10}
            padding={{ left: 15, right: 15 }}
            ticks={ticksArr}
            tickCount={ticksArr.length}
            tickFormatter={axDateFormatter}
          />
          <YAxis
            dataKey="weight"
            domain={['auto', 'auto']}
            tick={{ dx: -5 }}
            tickFormatter={weightFormatter(unit)}
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
