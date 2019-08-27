import React from "react";
import NavBar from "./NavBar/NavBar";
import Home from './Home/Home';
import Profile from './Profile/Profile';
import singleProduct from './Product/SingleProduct';
import Typography from '@material-ui/core/Typography';
import FetchUser from "./FetchUser";
import Company from "./Company/Company";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";
import Menu from "./NavBar/Menu";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div>
      <FetchUser />
        <Menu />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/company' component={Company} />
          <Route exact path='/product/:id' component={singleProduct} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
    </div>
  );
}

export default App;