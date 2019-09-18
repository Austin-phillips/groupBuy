const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
      return {};
      case 'UPDATEUSER' :
        return action.user;
    default:
      return state;
  }
};

export default user;