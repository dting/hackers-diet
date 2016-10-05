import React, { PropTypes } from 'react';

import { Navbar } from '../../components';

const Demo = props => (
  <div className="demo fade-in">
    <Navbar path={props.location.pathname} />
    {props.children}
  </div>
);

Demo.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default Demo;
