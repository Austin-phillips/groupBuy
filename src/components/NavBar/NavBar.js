import React, { Component } from 'react';
import auth0Client from '../../Auth';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import { Link, withRouter } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {

  handleLogin = () => {
    auth0Client.signIn()
  };

  handleLogout = () => {
    this.props.dispatch(logout());
  }

  rightNavs = () => {
    if (!this.props.user.id) {
      return(
        <button onClick={() => this.handleLogin()}>Login</button>
      )
    } else {
      return(
        <span>
          <Link to='/profile'><button>Profile</button></Link>
          <button onClick={() => this.handleLogout()}>Log out</button>
        </span>
      )
    }
  }

  render() {
    return(
      <div id='navBarContainer'>
        <div id='innerNavBar'>
          <Link to='/'><button>Home</button></Link>
          <Link to='/products'><button>Products</button></Link>
          <Link to='/companies'><button>Companies</button></Link>
          {this.rightNavs()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user}
}

export default withRouter(connect(mapStateToProps)(NavBar));