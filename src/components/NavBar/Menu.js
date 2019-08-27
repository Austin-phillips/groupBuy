import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CategoriesIcon from '@material-ui/icons/Toc';
import MenuIcon from '@material-ui/icons/Dehaze';
import { useAuth0 } from '../../react-auth0-wrapper';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Menu(props) {
  const classes = useStyles();
  const { loginWithRedirect, logout } = useAuth0();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const displayAuth = () => {
    return (
      <div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
        </List>
      </div>
    )
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon><CategoriesIcon /></ListItemIcon>
          <ListItemText primary="Categories"/>
        </ListItem>
      </List>
      {props.user.id ? displayAuth() : null}
    </div>
  );

  return (
    <div id='menuContainer'>
      <Button id='menuButton' onClick={toggleDrawer('left', true)}><MenuIcon /></Button>
      <Typography variant='h2' display='inline'>paq</Typography>
      {!props.user.id ? <Button id='loginButton' onClick={() => loginWithRedirect()}>Login</Button> : <Button id='loginButton' onClick={() => logout()}>Logout</Button>}
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default withRouter(connect(mapStateToProps)(Menu));