import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ProductCard from './Card';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Home(props) {
  const classes = useStyles();

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
      <div className={classes.root}>
        <Grid container spacing={12} justify="center" spacing={10}>
            {props.products.map(product => {
              return <ProductCard product={product} key={product.id} />
            })}
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { products: state.products, user: state.user, userProducts: state.userProducts }
}

export default withRouter(connect(mapStateToProps)(Home));