import { Link } from 'react-router';
import React from 'react';

const Login = () => (
  <div className="login fade-in">
    <div className="heading">Human API & Hacker&apos;s Diet</div>
    <div className="actions">
      <a className="google-btn" href="/auth/google">
        <img className="icon" src={require('./g-normal.png')} alt={'google icon'} />
        <span className="buttonText">Google</span>
      </a>
      <Link className="demo-btn" to="/demo">
        <span className="buttonText">Demo</span>
      </Link>
    </div>
    <div className="info">
      <div>For more info checkout:</div>
      <a href={'https://humanapi.co'}>Human API</a>
      <a href={'https://www.fourmilab.ch/hackdiet/'}>The Hacker&apos;s Diet</a>
    </div>
  </div>
);

export default Login;
