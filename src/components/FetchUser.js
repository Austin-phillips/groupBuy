import { connect } from 'react-redux';
import { login, userLogout } from '../actions/user'
import { useAuth0 } from "../react-auth0-wrapper";

function FetchUser(props) {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = props.dispatch;

  if (isAuthenticated) {
    dispatch(login(user.email))
    return props.children;
  }
  dispatch(userLogout())
  return props.children;
}

export default connect()(FetchUser);