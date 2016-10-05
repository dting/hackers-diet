import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

import { actions as authActions } from '../../modules/auth';
import { NavItem } from './';

const Navbar = ({ logout, path }) => (
  <nav className="navbar">
    <NavItem match="/" path={path}>
      <Link className="brand" to="/">Hacker&apos;s Diet</Link>
    </NavItem>
    <div className="nav">
      <NavItem match="/connect" path={path}>
        <Link className="link" to="/connect">Connect</Link>
      </NavItem>
    </div>
    <NavItem>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </NavItem>
  </nav>
);

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  path: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(authActions.logout, dispatch),
});

export default connect(null, mapDispatchToProps)(Navbar);
