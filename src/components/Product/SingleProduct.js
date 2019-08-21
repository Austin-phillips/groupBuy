import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct, buyProduct, addToUser, getUserOrderId } from '../../actions/products';
import { Link, withRouter } from 'react-router-dom';

class SingleProduct extends Component {

  componentDidMount() {
    const { dispatch, user } = this.props;
    const { id } = this.props.match.params;
    dispatch(getSingleProduct(id));
    dispatch(getUserOrderId(user.id))
  };

  handleBuy = () => {
    const { user, dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(buyProduct(id))
    dispatch(addToUser(user.id, id))
  };

  render() {
    const { id, name, description, price, personLimit, timer, count, category, sold } = this.props.products[0];
    const {user} = this.props;
    return (
      <div>
        <div id='profileBox'>
          <h1>Single Product</h1>
          <h3>Product Name: {name}</h3>
          <h3>Description: {description}</h3>
          <h3>Price: ${price}</h3>
          <h3>Members: {count}/{personLimit}</h3>
          <h3>Timer: {timer}</h3>
          <h3>Category: {category}</h3>
          {user.id ? <button onClick={() => this.handleBuy()}>Buy</button> : <button>Login To Buy</button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user }
}

export default withRouter(connect(mapStateToProps)(SingleProduct));