import axios from 'axios';

export const getProducts = () => {
  return (dispatch) => {
    axios.get(`/api/products`)
      .then(res => {
        dispatch({ type: 'GET_PRODUCTS', products: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const buyProduct = (count, pid) => {
  return (dispatch) => {
    axios.put(`/api/products/buy/${pid}`, {count})
    .then( res => {
      dispatch({ type: 'UPDATE_PRODUCT', product: res.data, id: pid})
    })
    .catch( err => {
      console.log(err)
    })
  }
};

export const addToUser = (uid, pid) => {
  return (dispatch) => {
    axios.post('/api/products/relation', {uid, pid})
    .then( res => {
      dispatch({ type: 'ADD_USERPRODUCT', userProduct: res.data})
    })
    .catch( err => {
      console.log(err)
    })
  }
};

export const getUserOrders = (uid) => {
  return (dispatch) => {
    axios.get(`/api/products/${uid}`)
    .then( res => {
      dispatch({ type: 'GET_USERPRODUCTS', userProducts: res.data})
    })
    .catch( err => {
      console.log(err)
    })
  }
}