import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { ButtonConnectPage, Chart, WeightLog } from '../../components';
import { actions } from '../../modules/humanapi';

class Home extends Component {
  componentWillMount() {
    this.props.getWeightReadings(this.props.jwtToken);
  }

  componentWillUnmount() {
    this.props.clearWeightReadings();
  }

  render() {
    const { pending, weightReadings } = this.props;
    return (
      <div className="home fade-in">
        {!pending && !weightReadings.length && (
          <div className="connect-info">
            <p>Add a Human API connection with weight data...</p>
            <ButtonConnectPage />
          </div>
        )}
        {!pending && !!weightReadings.length && (
          <div className="home-content">
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
        )}
      </div>
    );
  }
}

Home.propTypes = {
  clearWeightReadings: PropTypes.func.isRequired,
  getWeightReadings: PropTypes.func.isRequired,
  jwtToken: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  weightReadings: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = state => ({
  jwtToken: state.auth.token,
  pending: state.humanapi.pending,
  weightReadings: state.humanapi.weightReadings,
});

const mapDispatchToProps = dispatch => ({
  clearWeightReadings: bindActionCreators(actions.clearWeightReadings, dispatch),
  getWeightReadings: bindActionCreators(actions.getWeightReadings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
