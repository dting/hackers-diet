import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

import { Chart, Navbar, NavItem, WeightLog } from '../../components';
import { actions } from '../../modules/humanapi';

class Demo extends Component {
  componentDidMount() {
    this.props.getWeightReadings();
  }

  componentWillUnmount() {
    this.props.clearWeightReadings();
  }

  render() {
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
              <WeightLog data={this.props.weightReadings} />
            </div>
          </div>
          <div className="main-panel">
            <h2 className="header">Chart</h2>
            <div className="chart">
              <Chart data={this.props.weightReadings} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  weightReadings: PropTypes.arrayOf(PropTypes.shape({})),
  getWeightReadings: PropTypes.func.isRequired,
  clearWeightReadings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  weightReadings: state.humanapi.weightReadings,
});

const mapDispatchToProps = dispatch => ({
  getWeightReadings: bindActionCreators(actions.getWeightReadings, dispatch),
  clearWeightReadings: bindActionCreators(actions.clearWeightReadings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
