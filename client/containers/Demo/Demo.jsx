import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

import { Chart, Navbar, NavItem, WeightLog } from '../../components';
import { actions } from '../../modules/humanapi';

class Demo extends Component {
  componentDidMount() {
    this.props.actions.getWeightReadings();
  }

  componentWillUnmount() {
    this.props.actions.clearWeightReadings();
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
            <WeightLog {...this.props} />
          </div>
          <div className="main-panel">
            <div className="chart">
              <Chart {...this.props} />
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
  actions: PropTypes.shape({
    clearWeightReadings: PropTypes.func.isRequired,
    getWeightReadings: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = state => ({
  ...state.humanapi,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
