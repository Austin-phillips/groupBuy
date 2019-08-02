import React, { Component } from 'react';
import auth0Client from './Auth';
import { withRouter } from 'react-router-dom';
import { login } from './actions/user';
import { connect } from 'react-redux'

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    const email = auth0Client.getProfile().email
    await this.props.dispatch(login(email));
    this.props.history.replace('/');
  }

  render() {
    return (
      <div id='loaderContainer'>
        Loading
      </div>
    );
  }
}

export default connect()(withRouter(Callback));