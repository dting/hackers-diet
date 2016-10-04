import React from 'react';

const Login = () => (
  <div className="page-wrapper">
    <div className="heading">Human API & Hacker&apos;s Diet</div>
    <div className="login">
      <a className="google-btn" href="/auth/google">
        <span className="icon" />
        <span className="buttonText">Google</span>
      </a>
    </div>
    <div className="info">
      <div>For more info checkout:</div>
      <a href={'https://humanapi.co'}>Human API</a>
      <a href={'https://www.fourmilab.ch/hackdiet/'}>The Hacker&apos;s Diet</a>
    </div>
  </div>
);

export default Login;
