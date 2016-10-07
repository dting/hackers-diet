import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { actions as userActions } from '../../modules/user';

const connectHandler = function connectHandler(props) {
  const {
    jwtToken,
    publicToken,
    router,
    userConnect,
    userId,
  } = props;
  return () => HumanConnect.open({
    clientId: process.env.HUMAN_API_ID,
    clientUserId: encodeURIComponent(userId),
    publicToken: publicToken || '',
    finish: (err, sessionTokenObject) => {
      if (!err) {
        userConnect(jwtToken, sessionTokenObject)
          .then(() => router.replace('/'));
      }
    },
  });
};

const Connect = props => (
  <div className="connect fade-in">
    <h1>Connect</h1>
    <input
      className="connect-img-btn"
      onClick={connectHandler(props)}
      src={require('./blue.png')}
      type="image"
    />
  </div>
);

Connect.propTypes = {
  jwtToken: PropTypes.string.isRequired,
  publicToken: PropTypes.string.isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }),
  userConnect: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  jwtToken: state.auth.token,
  publicToken: state.user.publicToken,
  userId: state.user._id,
});

const mapDispatchToProps = dispatch => ({
  userConnect: bindActionCreators(userActions.connect, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Connect));
