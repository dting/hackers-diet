import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as authActions } from '../../modules/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.actions.logout();
  }

  render() {
    return (
      <div className="page-wrapper">
        <h1>Home</h1>
        <div>{JSON.stringify(this.props.user.name)}</div>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

Home.propTypes = {
  logout: PropTypes.func,
  actions: PropTypes.shape({
    logout: PropTypes.func,
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
