import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as authActions } from '../../modules/auth';

const Home = ({ logout }) => (
  <div className="page-wrapper">
    <h1>Home</h1>
    <button onClick={logout}>Logout</button>
  </div>
);

Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(authActions.logout, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
