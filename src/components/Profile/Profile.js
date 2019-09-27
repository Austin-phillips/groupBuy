import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import StripeCheckout from 'react-stripe-checkout';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {createCompanyUser} from '../../actions/company';
import {updateUser, updateUserCompany, addCard, updateCard} from '../../actions/user';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  bigAvatar: {
    margin: 10,
    width: 180,
    height: 180,
  },
}));

function Profile(props) {
  const classes = useStyles();
  const [editing, updateEditing] = useState(false);
  const [createCompany, updateCreateCompany] = useState(false);
  const [companyName, setCompanyName] = useState('')
  const [user, setUser] = React.useState({
    id: props.user.id,
    first: props.user.first || '',
    last: props.user.last || '',
    phone: props.user.phone || '',
    email: props.user.email,
    addressOne: props.user.addressOne || '',
    addressTwo: props.user.addressTwo || '',
    city: props.user.city || '',
    state: props.user.state || '',
    zip: props.user.zip || '',
    card: props.user.card,
    complete: props.user.complete,
    lastFour: props.user.lastFour,
    company: props.user.company,
    image: props.user.image
  });

  const handleChange = name => event => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleCompanyChange = name => event => {
    setCompanyName(event.target.value);
  };

  const handleSaveUser = () => {
    const {dispatch} = props;
    dispatch(updateUser(user));
    updateEditing(false);
  }

  const handleSaveCompany = () => {
    const {dispatch} = props;
    const userId = user.id
    dispatch(createCompanyUser({companyName, userId}))
    setCompanyName('');
    updateCreateCompany(!createCompany)
    dispatch(updateUserCompany({company: true, userId}))
  }

  const handleCancel = () => {
    setCompanyName('')
    updateCreateCompany(!createCompany)
  }

  const handleToken = (token) => {
    const {dispatch} = props;
    dispatch(addCard(token, user.id))
  }

  const updateToken = (token) => {
    const {dispatch} = props;
    dispatch(updateCard(token, user.id, user.card))
  }

  const handleCreateCompany = () => {
    if (createCompany) {
      return (
        <div>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="Company Name"
              className={classes.textField}
              value={companyName}
              onChange={handleCompanyChange('')}
              margin="normal"
            />
            <Button onClick={() => handleSaveCompany()}>Create</Button>
            <Button onClick={() => handleCancel()}>Cancel</Button>
          </form>
        </div>
      )
    } else {
      return null
    }
  }

  if (editing) {
    return (
      <div>
        <Paper id='profileBody'>
          <div id='innerBodyContainer'>
            <Typography variant='h5' gutterBottom align='center'>Profile Information</Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="standard-name"
                label="First"
                className={classes.textField}
                value={user.first}
                onChange={handleChange('first')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Last"
                className={classes.textField}
                value={user.last}
                onChange={handleChange('last')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Phone"
                className={classes.textField}
                value={user.phone}
                onChange={handleChange('phone')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Email"
                className={classes.textField}
                value={user.email}
                onChange={handleChange('email')}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="standard-name"
                label="Street Address"
                className={classes.textField}
                value={user.addressOne}
                onChange={handleChange('addressOne')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Apt"
                className={classes.textField}
                value={user.addressTwo}
                onChange={handleChange('addressTwo')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="City"
                className={classes.textField}
                value={user.city}
                onChange={handleChange('city')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="State"
                className={classes.textField}
                value={user.state}
                onChange={handleChange('state')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Zipcode"
                className={classes.textField}
                value={user.zip}
                onChange={handleChange('zip')}
                margin="normal"
              />
            </form>
            <Button id='saveButton' onClick={() => handleSaveUser()}>Save</Button>
          </div>
        </Paper>
      </div>
    )
  } else {
    return (
      <div>
        <Paper id='profileHeader'>
          <Grid container justify="center" alignItems="center">
            <Avatar alt="Profile Picture" src={user.image} className={classes.bigAvatar} />
          </Grid>
          <Typography id='text' variant='h3' gutterBottom align='center'>{user.first} {user.last}</Typography>
          <Button onClick={() => updateEditing(!editing)} id='profileEditButton' size='small'>Edit Profile</Button>
          {user.company ? 
            <Link to='company' id='link'>
              <Button id='profileCompanyButton' size='small'>Company Dashboard</Button>
            </Link>
            :
            <Button id='profileCompanyButton' onClick={() => updateCreateCompany(!createCompany)} size='small'>Create Company Page</Button>
          }
          {handleCreateCompany()}
        </Paper>
        <Paper id='profileBody'>
          <div id='innerBodyContainer'>
            <Typography id='text' variant='h5' gutterBottom align='center'>Account Information</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>Phone Number</Typography>
            <Typography id='text' align='center'>{user.phone}</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>Email</Typography>
            <Typography id='text' align='center'>{user.email}</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>Street</Typography>
            <Typography id='text' align='center'>{user.addressOne}</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>City, State</Typography>
            <Typography id='text' align='center'>{user.city}, {user.state}</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>Zipcode</Typography>
            <Typography id='text' align='center'>{user.zip}</Typography>
            <Divider />
            {user.card ? 
              <div>
                <Typography id='text' variant='subtitle2' align='center'>Card On File</Typography>
                <Typography align='center'>**** **** **** {user.lastFour}</Typography> 
                <StripeCheckout
                  id="stripeDiv"
                  stripeKey="pk_test_1Li60if50UsdBGtVgCeVwtw200C4oQejlR"
                  token={updateToken}
                  ComponentClass="div"
                  panelLabel="Update Card"
                >
                  <div id='addCardContainer'>
                    <Button id='addCard'>Update Card</Button>
                  </div>
                </StripeCheckout>
              </div>
              :
              <StripeCheckout
                id="stripeDiv"
                stripeKey="pk_test_1Li60if50UsdBGtVgCeVwtw200C4oQejlR"
                token={handleToken}
                ComponentClass="div"
                panelLabel="Add Card"
              >
                <div id='addCardContainer'>
                  <Button id='addCard'>Add Card</Button>
                </div>
              </StripeCheckout>
            }
          </div>
        </Paper>
      </div>
    );
  }
  }

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps)(Profile));