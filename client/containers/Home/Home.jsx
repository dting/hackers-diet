import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { ButtonConnectPage, Chart, WeightLog } from '../../components';
import { actions } from '../../modules/humanapi';

class Home extends Component {
  componentDidMount() {
    this.props.actions.getWeightReadings(this.props.jwtToken);
  }

  componentWillUnmount() {
    this.props.actions.clearWeightReadings();
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
              <WeightLog {...this.props} />
            </div>
            <div className="main-panel">
              <Chart {...this.props} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    clearWeightReadings: PropTypes.func.isRequired,
    getWeightReadings: PropTypes.func.isRequired,
  }),
  jwtToken: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  weightReadings: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = state => ({
  jwtToken: state.auth.token,
  ...state.humanapi,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
