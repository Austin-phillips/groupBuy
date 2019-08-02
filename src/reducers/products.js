const products = (state = [], action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return action.products
    case 'ADD_PRODUCT':
      return [...state, action.product]
    case 'UPDATE_PRODUCT':
      return state.map(s => {
        if (s.id === action.id)
          return action.product
        return s
      })
    case 'DELETE_PRODUCT':
      return state.filter(product => product.id !== action.id)
    default:
      return state;
  }
}

export default products;