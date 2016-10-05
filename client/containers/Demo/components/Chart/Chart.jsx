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

/** Fill in gaps in time series data */
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

const getTicks = (data) => {
  if (!data || !data.length) { return []; }

  const domain = [new Date(data[0].time), new Date(data[data.length - 1].time)];
  const scale = scaleTime().domain(domain).range([0, 1]);
  const ticks = scale.ticks(timeDay, 1);

  return ticks.map(entry => +entry);
};

/** Formatters **/
const axDateFormat = time => moment(time).format('MMM DD');
const ttDateFormat = time => moment(time).format('MMM DD, YYYY');
const ttWeightFormat = weight => `${weight.toFixed(1)} kg`;

const Chart = (props) => {
  const ticksArr = getTicks(props.data);
  const completeData = getTicksData(props.data, ticksArr);
  return (
    <ResponsiveContainer>
      <LineChart
        data={completeData}
        margin={{ top: 20, right: 10, bottom: 20, left: 0 }}
      >
        <Brush dataKey="name" height={25} stroke="#3186e4" />
        <CartesianGrid strokeDasharray="3 3" />
        <Line
          dataKey="weight"
          stroke="#3186e4"
          dot={{ stroke: '#3186e4', fill: '#3186e4' }}
          activeDot={{ r: 7 }}
        />
        <Tooltip labelFormatter={ttDateFormat} formatter={ttWeightFormat} />
        <XAxis
          dataKey="time"
          ticks={ticksArr}
          tickCount={ticksArr.length}
          tickFormatter={axDateFormat}
        />
        <YAxis
          dataKey="weight"
          domain={['auto', 'auto']}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Chart;
