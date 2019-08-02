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