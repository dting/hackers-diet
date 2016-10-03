import React from 'react';

const Login = () => (
  <div className="page-wrapper">
    <div className="heading">{"HumanAPI & Hacker's Diet"}</div>
    <div className="login">
      <a className="google-btn" href="/auth/google">
        <span className="icon" />
        <span className="buttonText">Google</span>
      </a>
    </div>
    <div className="info">
      <div>For more info Checkout:</div>
      <a href={'https://humanapi.co'}>HumanAPI</a>
      <a href={'https://www.fourmilab.ch/hackdiet/'}>{"The Hacker's Diet"}</a>
    </div>
  </div>
);

export default Login;
