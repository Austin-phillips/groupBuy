const userProducts = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERPRODUCTS':
      return action.userProducts
    case 'ADD_USERPRODUCT':
      return [...state, action.userProduct]
    case 'UPDATE_USERPRODUCT':
      return state.map(s => {
        if (s.id === action.id)
          return action.userProduct
        return s
      })
    case 'DELETE_USERPRODUCT':
      return state.filter(userProduct => userProduct.id !== action.id)
    default:
      return state;
  }
}

export default userProducts;