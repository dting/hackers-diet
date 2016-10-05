import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { actions as authActions } from '../../modules/auth';

const Navbar = ({ logout }) => (
  <nav className="navbar">
    <Link className="brand" to="/">Hacker&apos;s Diet</Link>
    <div className="nav">
      <Link className="item link" to="/connect" activeClassName="active">
        Connect
      </Link>
    </div>
    <span className="spacer" />
    <button className="logout-btn item" onClick={logout}>Logout</button>
  </nav>
);

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(authActions.logout, dispatch),
});

export default connect(null, mapDispatchToProps)(Navbar);
