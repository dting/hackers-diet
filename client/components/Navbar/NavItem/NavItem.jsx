import React, { PropTypes } from 'react';

const NavItem = ({ children, match, path }) => (
  <div className={`nav-item${(match && match === path && ' active') || ''}`}>
    {children}
  </div>
);

NavItem.propTypes = {
  children: PropTypes.node,
  match: PropTypes.string,
  path: PropTypes.string,
};

export default NavItem;
