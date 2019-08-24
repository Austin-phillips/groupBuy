import React from "react";
import { useAuth0 } from "../../react-auth0-wrapper";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Log in
        </button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default NavBar;














// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { logout } from '../../actions/user';
// import { Link, withRouter } from 'react-router-dom';
// import './NavBar.css';

// class NavBar extends Component {

//   handleLogin = () => {
//     console.log("Login")
//   };

//   handleLogout = () => {
//     this.props.dispatch(logout());
//   }

//   rightNavs = () => {
//     if (!this.props.user.id) {
//       return(
//         <button id='navBarButton' className='rightAlign' onClick={() => this.handleLogin()}>Login</button>
//       )
//     } else {
//       return(
//         <span>
//           <Link to='/profile'><button id='navBarButton' className='rightAlign'>My Account</button></Link>
//           <button id='navBarButton' className='rightAlign' onClick={() => this.handleLogout()}>Log out</button>
//         </span>
//       )
//     }
//   }

//   render() {
//     return(
//       <div>
//         <div id='navBarContainer'>
//           <div id='innerNavBar'>
//             <Link to='/'><button id='navBarButton' className='leftAlign'>Home</button></Link>
//             {this.rightNavs()}
//           </div>
//         </div>
//         <div id='navBarContainer'> <span id='groupBuy'>GroupBuy</span></div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return { user: state.user}
// }

// export default withRouter(connect(mapStateToProps)(NavBar));