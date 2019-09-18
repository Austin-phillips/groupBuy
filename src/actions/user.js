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

export const userLogout = () => {
  return (dispatch) => {
    dispatch({type: 'LOGOUT'});
  }
};

export const updateUser = (user) => {
  return (dispatch) => {
    axios.put('/api/users/update', user)
      .then(res => {
        dispatch({type: 'UPDATEUSER', user: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }
}