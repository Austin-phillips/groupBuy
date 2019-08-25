import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct, buyProduct, addToUser, getUserOrderId } from '../../actions/products';
import { withRouter } from 'react-router-dom';

class SingleProduct extends Component {
  state = { productsLoaded: false, ordersLoaded: false }

  componentDidMount() {
    const { dispatch, user } = this.props;
    const { id } = this.props.match.params;
    if (!user.id) {
      dispatch(getSingleProduct(id, this.productsLoaded()));
    } else {
      dispatch(getSingleProduct(id, this.productsLoaded()));
      dispatch(getUserOrderId(user.id, this.ordersloaded()))

    }
  };

  handleBuy = () => {
    const { user, dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(buyProduct(id))
    dispatch(addToUser(user.id, id))
  };

  handleBuyAgain = () => {
    const { user, dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(addToUser(user.id, id))
  }

  handleBuyButton = () => {
    const { userProducts } = this.props;
    const { id } = this.props.match.params;
    const productId = parseInt(id, 10)
    if (userProducts.includes(productId)) {
      return <button onClick={() => this.handleBuyAgain()}>Buy again</button>
    } else {
      return <button onClick={() => this.handleBuy()}>Buy</button>
    }
  }

  ordersloaded = () => {
    this.setState({ ordersLoaded: true })
  };

  productsLoaded = () => {
    this.setState({ productsLoaded: true })
  }

  render() {
    const { name, description, price, personLimit, timer, count, category } = this.props.products[0];
    const {user} = this.props;
    const { productsLoaded, ordersLoaded } = this.state;
    if (!user.id) {
      if (productsLoaded === true) {
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
              { count >= personLimit ? <button>Sold Out</button> : <button>Login To Buy</button>}
            </div>
          </div>
        );
      } else {
        return (
          <div id='profileBox'>
            <h1>Loading...</h1>
          </div>
        )
      }
    } else {
      if (productsLoaded && ordersLoaded === true) {
        return(
          <div>
            <div id='profileBox'>
              <h1>Single Product</h1>
              <h3>Product Name: {name}</h3>
              <h3>Description: {description}</h3>
              <h3>Price: ${price}</h3>
              <h3>Members: {count}/{personLimit}</h3>
              <h3>Timer: {timer}</h3>
              <h3>Category: {category}</h3>
              {count >= personLimit ? <button>Sold Out</button> : this.handleBuyButton()}
            </div>
          </div>
        )
      } else {
        return (
          <div id='profileBox'>
            <h1>Loading...</h1>
          </div>
        )
      }
    }
  }
}

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user, userProducts: state.userProducts }
}

export default withRouter(connect(mapStateToProps)(SingleProduct));