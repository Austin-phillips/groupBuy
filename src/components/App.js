import React from "react";
import NavBar from "./NavBar/NavBar";
import Home from './Home/Home';
import Profile from './Profile/Profile';
import singleProduct from './Product/SingleProduct';
import FetchUser from "./FetchUser";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div>
      <FetchUser>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/product/:id' component={singleProduct} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </FetchUser>
    </div>
  );
}

export default App;