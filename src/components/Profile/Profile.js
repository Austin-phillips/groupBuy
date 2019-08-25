import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserOrders } from '../../actions/products';

function Profile(props) {
  const { first, last, phone, email, addressOne, city, state, zip, card, company, companyId, admin } = props.user;

  useEffect(() => {
    const { dispatch, user } = props;
    if (!user.id) {
      return null
    } else {
      dispatch(getUserOrders(user.id))
    }
  }, [])

  const displayOrders = () => {
    const {userProducts} = props;
    return userProducts.map(up => {
      return(
        <div id='productBox' key={up.purId}>
          <div id='productImage'>Images</div>
          <h3>Product Name: <span>{up.name}</span></h3>
          <h3>Product Description: <span>{up.description}</span></h3>
          <h3>Price: <span>{up.price}</span></h3>
          <h3>Limit: <span>{up.count}/{up.personLimit}</span></h3>
          <h3>Timer: <span>{up.timer}</span></h3>
          <button id='buyButton'>Purchased</button>
        </div>
      )
    })
  }

    return (
      <div>
        <div id='profileBox'>
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
        <div id='orderContainer'>
          <h2>My Orders</h2>
          {displayOrders()}
        </div>
      </div>
    );
  }

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userProducts: state.userProducts
  }
}

export default connect(mapStateToProps)(Profile);