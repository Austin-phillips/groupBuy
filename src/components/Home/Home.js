import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts, buyProduct, addToUser, getUserOrders } from '../../actions/products';

class Home extends Component {
  state = {
    userProductId: []
  }

  async componentDidMount() {
    const { dispatch, user } = this.props;
    if (!user.id) {
      await dispatch(getProducts())
    } else {
      await dispatch(getProducts())
      await dispatch(getUserOrders(user.id))
      await this.makeIdArr()
    }
  }

  makeIdArr = () => {
    const {userProducts} = this.props;
    return userProducts.map(up => {
      return this.setState({
        userProductId: this.state.userProductId.concat(up.productId)
      })
    })
  }

  handleBuy = (pid) => {
    const uid = this.props.user.id
    const {dispatch} = this.props;
    dispatch(buyProduct(pid))
    dispatch(addToUser(uid, pid))
    this.forceUpdate()
  }

  handleBuyAgain = (pid) => {
    const uid = this.props.user.id
    const { dispatch } = this.props;
    dispatch(addToUser(uid, pid))
    this.forceUpdate()
  }

  displayButtons = (count, limit, pid) => {
    const { user, userProducts} = this.props;
    const { userProductId } = this.state;
    if (!user.id) {
      return(
        count >= limit ? <button id='buyButton'>Sold Out</button> : <button id='buyButton'>Log In To Buy</button>
      )
    } else {
      if (userProductId.includes(pid)) {
        return count >= limit ? <button id='buyButton'>Sold Out</button> : <button id='buyButton' onClick={() => this.handleBuyAgain(pid)}>Buy Again</button>
      } else {
        return count >= limit ? <button id='buyButton'>Sold Out</button> : <button id='buyButton' onClick={() => this.handleBuy(pid)}>Buy</button>

      }
    }
  }

  displayProducts = () => {
    const { products, user } = this.props;
    return products.map(p => {
      return(
        <div id='productBox' key={p.id}>
          <div id='productImage'>Images</div>
          <h3>Product Name: <span>{p.name}</span></h3>
          <h3>Product Description: <span>{p.description}</span></h3>
          <h3>Price: <span>{p.price}</span></h3>
          <h3>Limit: <span>{p.count}/{p.personLimit}</span></h3>
          <h3>Timer: <span>{p.timer}</span></h3>
          {this.displayButtons(p.count, p.personLimit, p.id)}
        </div>
      )
    })
  }

  render() {
    return (
      <div id='companyContainer'>
        <hr/>
          <span id='category'>Electronics | </span>
          <span id='category'>Clothing | </span>
          <span id='category'>Sports | </span>
          <span id='category'>Accessories</span>
        <hr/>
        {this.displayProducts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user, userProducts: state.userProducts}
}

export default connect(mapStateToProps)(Home);