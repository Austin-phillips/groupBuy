import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useAuth0 } from '../../react-auth0-wrapper';

function NavBar(props)  {
  const {loginWithRedirect, logout} = useAuth0();
  const {user} = props;

  const handleLogout = () => {
    logout()
  }

  const rightNavs = () => {
    if (!user.id) {
      return(
        <button id='navBarButton' className='rightAlign' onClick={() => loginWithRedirect()}>Login</button>
      )
    } else {
      return(
        <span>
          <Link to='/profile'><button id='navBarButton' className='rightAlign'>My Account</button></Link>
          {user.company === true ? <Link to='/company'><button id='navBarButton' className='rightAlign'>Company Dashboard</button></Link> : null}
          <button id='navBarButton' className='rightAlign' onClick={() => handleLogout()}>Log out</button>
        </span>
      )
    }
  }

    return(
      <div>
        <div id='navBarContainer'>
          <div id='innerNavBar'>
            <Link to='/'><button id='navBarButton' className='leftAlign'>Home</button></Link>
            {rightNavs()}
          </div>
        </div>
        <div id='navBarContainer'> <span id='groupBuy'>GroupBuy</span></div>
      </div>
    )
}

const mapStateToProps = (state) => {
  return { user: state.user}
}

export default withRouter(connect(mapStateToProps)(NavBar));