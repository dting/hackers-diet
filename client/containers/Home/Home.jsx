import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as authActions } from '../../modules/auth';

const Home = props => (
  <div className="page-wrapper">
    <h1>Home</h1>
    <div>{props.user.name}</div>
    <button onClick={props.actions.logout}>Logout</button>
  </div>
);

Home.propTypes = {
  actions: PropTypes.shape({
    logout: PropTypes.func.require,
  }),
  user: PropTypes.shape({
    name: PropTypes.string.require,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
