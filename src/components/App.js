import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Callback from '../Callback';
import auth0Client from '../Auth';
import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import Profile from './Profile/Profile';
import FetchUser from './FetchUser';
import SingleProduct from './Product/SingleProduct';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div>
        {/* <FetchUser> */}
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/product/:id' component={SingleProduct} />
            <Route exact path='/callback' component={Callback} />
            {/* <SecuredRoute path='/new-question'
                component={NewQuestion}
                checkingSession={this.state.checkingSession} /> */}
          </Switch>
        {/* </FetchUser> */}
      </div>
    );
  }
}

export default withRouter(App);