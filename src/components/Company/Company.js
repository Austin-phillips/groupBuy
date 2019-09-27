import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import { connect } from 'react-redux';
import { getCompany } from '../../actions/company';

function Company(props) {
  const {id} = props.user;
  const [companyLoaded, updateCompanyLoaded] = useState(false)
  useEffect(() => {
    function onLoad() {
      if (id) {
        const { dispatch } = props;
       return dispatch(getCompany(id, toggleLoading()))
      }
      return null
    }
    onLoad()
  }, [])

  const toggleLoading = () => {
    updateCompanyLoaded(!companyLoaded)
  }

  if (companyLoaded) {
    return (
      <div id='companyContainer'>
        <h1 id='text'>{props.company.name}</h1>
      </div>
    )
  } else {
    return <Loader />
  }
}

const mapStateToProps = state => {
  return { company: state.company, user: state.user}
}
export default connect(mapStateToProps)(Company);