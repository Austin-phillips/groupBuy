import axios from 'axios';

export const getCompanies = () => {
  return (dispatch) => {
    axios.get(`/api/companies`)
      .then(res => {
        dispatch({ type: 'GET_COMPANIES', companies: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}