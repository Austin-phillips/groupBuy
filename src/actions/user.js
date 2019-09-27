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
};

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
};

export const updateUserCompany = (info) => {
  return (dispatch) => {
    axios.put('/api/users/update/company', info)
      .then(res => {
        dispatch({type: 'UPDATEUSER', user: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }
};

export const addCard = (token, id) => {
  return (dispatch) => {
    axios.post('/api/users/addcard', {userId: id, token: token})
      .then(res => {
        dispatch({type: 'UPDATEUSER', user: res.data})
        window.location.replace('/profile');
      })
      .catch(err => {
        console.log(err)
      })
  }
};

export const updateCard = (token, id, customerId) => {
  return (dispatch) => {
    axios.post('/api/users/updatecard', {userId: id, token, customerId})
      .then(res => {
        dispatch({type: 'UPDATEUSER', user: res.data})
        window.location.replace('/profile');
      })
      .catch(err => {
        console.log(err)
      })
  }
};