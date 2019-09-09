import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import { Link, withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ProductCard from './Card';


function Home(props) {

  useEffect(() => {
    function onLoad() {
      const { dispatch } = props;
      dispatch(getProducts())
    }
    onLoad()
  }, [])

  return (
    <div id='homeContainer'>
      <Divider />
      {props.products.map(product => {
        return <ProductCard product={product} />
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user, userProducts: state.userProducts }
}

export default withRouter(connect(mapStateToProps)(Home));