import React, {useEffect} from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import { Link, withRouter } from 'react-router-dom';
import './Home.css';

function Home(props) {

  useEffect(() => {
    function onLoad() {
      const { dispatch } = props;
      dispatch(getProducts())
    }
    onLoad()
  }, [])

  const displayProducts = () => {
    const { products } = props;
    return products.map(p => {
      return(
        <Link to={`/product/${p.id}`} key={p.id}>
          <div id='productBox'>
            <div id='productImage'>Images</div>
            <h3>Product Name: <span>{p.name}</span></h3>
            <h3>Product Description: <span>{p.description}</span></h3>
            <h3>Price: <span>{p.price}</span></h3>
            <h3>Limit: <span>{p.count}/{p.personLimit}</span></h3>
            <h3>Timer: <span>{p.timer}</span></h3>
          </div>
        </Link>
      )
    })
  }

    return (
      <div id='companyContainer'>
        <hr/>
          <span id='category'>Electronics | </span>
          <span id='category'>Clothing | </span>
          <span id='category'>Sports | </span>
          <span id='category'>Accessories</span>
        <hr/>
        {displayProducts()}
      </div>
    );
  }

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user, userProducts: state.userProducts}
}

export default withRouter(connect(mapStateToProps)(Home));