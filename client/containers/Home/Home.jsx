import { Link } from 'react-router';
import React from 'react';

const Home = () => (
  <div className="home fade-in">
    <h1>Home</h1>
    <div className="connect-info">
      <Link to={'/connect'}>Connect</Link>
    </div>
  </div>
);

export default Home;
