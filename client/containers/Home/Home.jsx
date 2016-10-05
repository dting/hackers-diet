import { Link } from 'react-router';
import React from 'react';

import { Navbar } from '../../components';

const Home = () => (
  <div className="page-wrapper home">
    <Navbar />
    <h1>Home</h1>
    <div className="connect-info">
      <Link to={'/connect'}>Connect</Link>
    </div>
  </div>
);

export default Home;
