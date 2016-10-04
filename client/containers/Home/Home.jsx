import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

import { actions as authActions } from '../../modules/auth';

const Home = ({ logout }) => (
  <div className="page-wrapper home">
    <h1>Home</h1>
    <div className="connect-info">
      <Link to={'/connect'}>Connect</Link>
    </div>
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
