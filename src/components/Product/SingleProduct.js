import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getSingleProduct, buyProduct, addToUser, getUserOrderId } from '../../actions/products';
import { withRouter } from 'react-router-dom';

function SingleProduct(props) {
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const { name, description, price, personLimit, timer, count, category } = props.products[0];
  const { user } = props;

  useEffect(() => {
    const { dispatch, user } = props;
    const { id } = props.match.params;
    if (!user.id) {
      dispatch(getSingleProduct(id, handlePL()));
    } else {
      dispatch(getSingleProduct(id, handlePL()));
      dispatch(getUserOrderId(user.id, handleOL()))
    }
  }, [])

  const handleBuy = () => {
    const { user, dispatch } = props;
    const { id } = props.match.params;
    dispatch(buyProduct(id))
    dispatch(addToUser(user.id, id))
  };

  const handleBuyAgain = () => {
    const { user, dispatch } = props;
    const { id } = props.match.params;
    dispatch(addToUser(user.id, id))
  }

  const handleBuyButton = () => {
    const { userProducts } = props;
    const { id } = props.match.params;
    const productId = parseInt(id, 10)
    if (userProducts.includes(productId)) {
      return <button onClick={() => handleBuyAgain()}>Buy again</button>
    } else {
      return <button onClick={() => handleBuy()}>Buy</button>
    }
  }

  const handleOL = () => {
    setOrdersLoaded(true)
  };

  const handlePL = () => {
    setProductsLoaded(true)
  }

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
              {count >= personLimit ? <button>Sold Out</button> : handleBuyButton()}
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

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user, userProducts: state.userProducts }
}

export default withRouter(connect(mapStateToProps)(SingleProduct));