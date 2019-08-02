import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import './Products.css';

class Products extends Component {

  componentDidMount() {
    this.props.dispatch(getProducts())
  }

  displayProducts = () => {
    const {products} = this.props;
    return products.map(p => {
      return(
        <div id='productBox' key={p.id}>
          <h3>Product Name: <span>{p.name}</span></h3>
          <h3>Product Description: <span>{p.description}</span></h3>
          <h3>Link to company website: <span>{p.link}</span></h3>
          <h3>Price: <span>{p.price}</span></h3>
          <h3>Limit: <span>{p.personLimit}</span></h3>
          <h3>Timer: <span>{p.timer}</span></h3>
          <h3>Company ID: <span>{p.companyId}</span></h3>
          <h3>Sold? <span>{p.sold === true ? 'Yes' : 'No'}</span></h3>
        </div>
      )
    })
  }

  render() {
    return (
      <div id='companyContainer'>
        <h1>Products</h1>
        {this.displayProducts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {products: state.products}
}

export default connect(mapStateToProps)(Products);