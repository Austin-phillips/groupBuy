import axios from 'axios';

export const login = (email) => {
  return (dispatch) => {
    axios.get(`/api/users/${email}`)
      .then( res => {
        dispatch({ type: 'LOGIN', user: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({type: 'LOGOUT'});
  }
}