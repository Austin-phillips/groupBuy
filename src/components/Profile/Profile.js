import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
}));

function Profile(props) {
  const classes = useStyles();
  const {company, companyId, admin } = props.user;
  const [editing, updateEditing] = useState(false);
  const [values, setValues] = React.useState({
    first: props.user.first,
    last: props.user.last,
    phone: props.user.phone,
    email: props.user.email,
    addressOne: props.user.addressOne,
    addressTwo: props.user.addressTwo,
    city: props.user.city,
    state: props.user.state,
    zip: props.user.zip,
    card: props.user.card,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSave = () => {
    console.log(values);
    updateEditing(!editing);
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
                value={values.first}
                onChange={handleChange('first')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Last"
                className={classes.textField}
                value={values.last}
                onChange={handleChange('last')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Phone"
                className={classes.textField}
                value={values.phone}
                onChange={handleChange('phone')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Street Address"
                className={classes.textField}
                value={values.addressOne}
                onChange={handleChange('addressOne')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Apt"
                className={classes.textField}
                value={values.addressTwo || ''}
                onChange={handleChange('addressTwo')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="City"
                className={classes.textField}
                value={values.city}
                onChange={handleChange('city')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="State"
                className={classes.textField}
                value={values.state}
                onChange={handleChange('state')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Zipcode"
                className={classes.textField}
                value={values.zip}
                onChange={handleChange('zip')}
                margin="normal"
              />
            </form>
            <Button id='saveButton' onClick={() => handleSave()}>Save</Button>
          </div>
        </Paper>
      </div>
    )
  } else {
    return (
      <div>
        <Paper id='profileHeader'>
          <Paper id='profileImage'>Image</Paper>
          <Typography variant='h3' gutterBottom align='center'>{values.first} {values.last}</Typography>
          <Button onClick={() => updateEditing(!editing)} id='profileEditButton' size='small'>Edit Profile</Button>
        </Paper>
        <Paper id='profileBody'>
          <div id='innerBodyContainer'>
            <Typography variant='h5' gutterBottom align='center'>Account Information</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>Phone Number</Typography>
            <Typography align='center'>{values.phone}</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>Email</Typography>
            <Typography align='center'>{values.email}</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>Street</Typography>
            <Typography align='center'>{values.addressOne}</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>City, State</Typography>
            <Typography align='center'>{values.city}, {values.state}</Typography>
            <Divider />
            <Typography id='text' variant='subtitle2' align='center'>Zipcode</Typography>
            <Typography align='center'>{values.zip}</Typography>
            <Divider />
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

export default connect(mapStateToProps)(Profile);