import { Link } from 'react-router';
import React from 'react';

const ConnectPageButton = () => (
  <Link className="connect-link" to={'/connect'}>
    <div className="connect-btn">
      <div className="connect-btn_icon" />
      <div className="connect-btn_text">
        <span>Connect</span>
      </div>
    </div>
  </Link>
);

export default ConnectPageButton;
