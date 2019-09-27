import axios from 'axios';

export const getCompany = (userId, callback) => {
  return (dispatch) => {
    axios.get(`/api/companies/${userId}`)
      .then(res => {
        dispatch({ type: 'GET_COMPANY', company: res.data })
        callback()
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const createCompanyUser = (company) => {
  return (dispatch) => {
    axios.post('/api/companies', company)
      .then(res => {
        console.log("Both relations successfully created");
        window.location.replace("/company")
      })
      .catch(err => {
        console.log(err)
      })
  }
}