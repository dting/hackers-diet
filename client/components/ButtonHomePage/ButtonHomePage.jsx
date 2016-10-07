import { Link } from 'react-router';
import React from 'react';

const ButtonHomePage = () => (
  <Link className="home-link" to={'/'}>
    <div className="home-btn">
      <div className="home-btn_icon" />
      <div className="home-btn_text">
        <span>Home</span>
      </div>
    </div>
  </Link>
);

export default ButtonHomePage;
