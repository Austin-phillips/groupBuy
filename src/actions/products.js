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
};

export const getSingleProduct = (id, callback) => {
  return (dispatch) => {
    axios.get(`/api/products/${id}`)
    .then(res => {
      dispatch({ type: 'GET_PRODUCTS', products: res.data})
      return callback
    })
    .catch(err => {
      console.log(err)
    })
  }
};

export const buyProduct = (pid) => {
  return (dispatch) => {
    axios.put(`/api/products/buy/${pid}`)
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
    axios.post('/api/product/user', {uid, pid})
    .then( res => {
      dispatch({ type: 'ADD_USERPRODUCT', userProduct: res.data})
      window.location.replace('/profile')
    })
    .catch( err => {
      console.log(err)
    })
  }
};

export const getUserOrders = (uid) => {
  return (dispatch) => {
    axios.get(`/api/product/user/${uid}`)
    .then( res => {
      dispatch({ type: 'GET_USERPRODUCTS', userProducts: res.data})
    })
    .catch( err => {
      console.log(err)
    })
  }
}

export const getUserOrderId = (uid, callback) => {
  return (dispatch) => {
    axios.get(`/api/product/user/order/${uid}`)
    .then( res => {
      dispatch({ type: 'GET_USERPRODUCTS', userProducts: res.data})
      return callback
    })
    .catch( err => {
      console.log(err)
    })
  }
}