import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {

  render() {
    const { first, last, phone, email, addressOne, addressTwo, city, state, zip, card, company, companyId, admin } = this.props.user;
    return (
      <div id='productBox'>
        <h1>User Profile</h1>
        <h3>Name: <span>{first} {last}</span></h3>
        <h3>Phone: <span>{phone}</span></h3>
        <h3>Email: <span>{email}</span></h3>
        <h3>Address: <span>{addressOne}</span></h3>
        <h3>City: <span>{city}</span></h3>
        <h3>State: <span>{state}</span></h3>
        <h3>Zip: <span>{zip}</span></h3>
        <h3>Card: <span>{card}</span></h3>
        <h3>Are you a company? <span>{company === true ? 'Yes' : 'No'}</span></h3>
        <h3>Company ID: <span>{companyId}</span></h3>
        <h3>Admin: <span>{admin === true ? 'Yes' : 'No'}</span></h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile);