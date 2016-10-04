import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as userActions } from '../../modules/user';

const connectHandler = function connectHandler({ jwtToken, publicToken, userConnect, userId }) {
  const options = {
    clientUserId: encodeURIComponent(userId),
    clientId: process.env.HUMAN_API_ID,
    publicToken: publicToken || '',
    finish: (err, sessionTokenObject) => {
      if (!err) {
        userConnect(jwtToken, sessionTokenObject);
      }
    },
  };
  return () => HumanConnect.open(options);
};

const Connect = props => (
  <div className="page-wrapper connect">
    <h1>Connect</h1>
    <input
      type="image"
      src={require('./blue.png')}
      onClick={connectHandler(props)}
      className="connect-btn"
    />
  </div>
);

Connect.propTypes = {
  jwtToken: PropTypes.string,
  publicToken: PropTypes.string,
  userConnect: PropTypes.func,
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
