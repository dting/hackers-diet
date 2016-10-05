import React, { PropTypes } from 'react';

import { Navbar } from '../../components';

const App = props => (
  <div className="app fade-in">
    <Navbar path={props.location.pathname} />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default App;
