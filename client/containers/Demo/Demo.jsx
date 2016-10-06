import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

import { Navbar, NavItem } from '../../components';
import { Chart, WeightLog } from './components';
import { actions } from './';

const average = weights => weights.reduce((a, b) => a + b) / weights.length;

const reshape = data => data.map(e => ({
  time: new Date(e.timestamp).getTime(),
  weight: e.value,
  unit: e.unit,
}));

const combineByDate = (data) => {
  if (!data || !data.length) { return []; }

  const dates = Object.create(null);
  data.forEach((item) => {
    const key = moment(item.time).startOf('day');
    if (!(key in dates)) dates[key] = [];
    dates[key].push(item);
  });
  return Object.keys(dates).map((key, i) => ({
    time: new Date(key).getTime(),
    weight: average(dates[key].map(item => item.weight)),
    unit: dates[key][0].unit,
    id: i,
  })).sort((a, b) => a.time - b.time);
};

class Demo extends Component {
  componentDidMount() {
    this.props.weight();
  }

  render() {
    const data = reshape(this.props.demoData);
    const combinedData = combineByDate(data);
    return (
      <div className="demo fade-in">
        <Navbar path={this.props.location.pathname}>
          <NavItem match="/demo" path={this.props.location.pathname}>
            <Link className="link" to="/demo">Demo</Link>
          </NavItem>
        </Navbar>
        <div className="demo-content">
          <div className="side-panel">
            <h2 className="header">Weight Log</h2>
            <div className="log">
              <WeightLog data={combinedData} />
            </div>
          </div>
          <div className="main-panel">
            <h2 className="header">Chart</h2>
            <div className="chart">
              <Chart data={combinedData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  weight: PropTypes.func,
  demoData: PropTypes.arrayOf(PropTypes.shape({
    weight: PropTypes.number,
  })),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  demoData: state.demo.data,
});

const mapDispatchToProps = dispatch => ({
  weight: bindActionCreators(actions.weight, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
