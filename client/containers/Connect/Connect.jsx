import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as userActions } from '../../modules/user';

const connectHandler = function connectHandler(jwtToken, publicToken, userConnect, userId) {
  return () => HumanConnect.open({
    clientUserId: encodeURIComponent(userId),
    clientId: process.env.HUMAN_API_ID,
    publicToken: publicToken || '',
    finish: (err, sessionTokenObject) => !err && userConnect(jwtToken, sessionTokenObject),
  });
};

const Connect = ({ jwtToken, publicToken, userConnect, userId }) => (
  <div className="connect fade-in">
    <h1>Connect</h1>
    <input
      type="image"
      src={require('./blue.png')}
      onClick={connectHandler(jwtToken, publicToken, userConnect, userId)}
      className="connect-btn"
    />
  </div>
);

Connect.propTypes = {
  jwtToken: PropTypes.string.isRequired,
  publicToken: PropTypes.string,
  userConnect: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

const mapStateToProps = state => ({
  jwtToken: state.auth.token,
  publicToken: state.user.publicToken,
  userId: state.user._id,
});

const mapDispatchToProps = dispatch => ({
  userConnect: bindActionCreators(userActions.connect, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
