const companies = (state = [], action) => {
  switch (action.type) {
    case 'GET_COMPANIES':
      return action.companies
    case 'ADD_COMPANY':
      return [...state, action.company]
    case 'UPDATE_COMPANY':
      return state.map(s => {
        if (s.id === action.id)
          return action.company
        return s
      })
    case 'DELETE_COMPANY':
      return state.filter(company => company.id !== action.id)
    default:
      return state;
  }
}

export default companies;