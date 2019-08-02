import axios from 'axios';
import auth0Client from '../Auth';

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
    auth0Client.signOut()
  }
}