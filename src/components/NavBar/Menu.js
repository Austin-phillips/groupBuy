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
import AccountIcon from '@material-ui/icons/AccountCircle';
import CompanyIcon from '@material-ui/icons/DeveloperBoard';
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
          <Link to='/profile' id='link'>
            <ListItem button>
              <ListItemIcon><AccountIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          {props.user.company ? 
            <Link to='/company' id='link'>
              <ListItem button>
                <ListItemIcon><CompanyIcon /></ListItemIcon>
                <ListItemText primary="Company Dashboard" />
              </ListItem>
            </Link> :
            null
          }
          {props.user.admin ?
            <ListItem button>
              <ListItemIcon><CompanyIcon /></ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem> :
            null
          }
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
        <Link to='/' id='link'>
          <ListItem button>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
        </Link>
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
      <Typography variant='h2' display='inline' id='menuHeader'>paq</Typography>
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