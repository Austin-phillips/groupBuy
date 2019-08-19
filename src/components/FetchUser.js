import { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/user'
import auth0Client from '../Auth';

class FetchUser extends Component{
  state = { loaded: false };

  componentWillMount() {
    if (auth0Client.isAuthenticated()) {
      console.log("true")
      this.loaded()
    } else {
      console.log("false")
      this.loaded()
    }
  }

  componentWillReceiveProps() {
    if (!this.state.loaded) this.loaded();
  }

  loaded = () => {
    console.log(auth0Client.isAuthenticated())
    this.setState({ loaded: true });
  }

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}

export default connect()(FetchUser)