import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCompanies } from '../../actions/company';
import './Companies.css';

class Companies extends Component {

  componentDidMount() {
    this.props.dispatch(getCompanies())
  }

  handlecompanies = () => {
    const { companies } = this.props;

    return companies.map(c => {
      return(
        <div id='productBox' key={c.id}>
          <h3>Company ID: <span>{c.id}</span></h3>
          <h3>Company Name: <span>{c.name}</span></h3>
          <h3>Logo <span>{c.logo}</span></h3>
        </div>
      )
    })
  }

  render() {
    return (
      <div id='companyContainer'>
        <h1>Company Page</h1>
        {this.handlecompanies()}
\      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { companies: state.company }
}

export default connect(mapStateToProps)(Companies);