import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { ButtonConnectPage, Chart, WeightLog } from '../../components';
import { actions } from '../../modules/humanapi';

class Home extends Component {
  componentDidMount() {
    this.props.actions.getWeights(this.props.jwtToken);
  }

  componentWillUnmount() {
    this.props.actions.clearWeights();
  }

  render() {
    const { pending, weights } = this.props;
    return (
      <div className="home fade-in">
        {!pending && !weights.length && (
          <div className="connect-info">
            <p>Add a Human API connection with weight data...</p>
            <ButtonConnectPage />
          </div>
        )}
        {!pending && !!weights.length && (
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
    clearWeights: PropTypes.func.isRequired,
    getWeights: PropTypes.func.isRequired,
  }),
  jwtToken: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  weights: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = state => ({
  jwtToken: state.auth.token,
  ...state.humanapi,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
