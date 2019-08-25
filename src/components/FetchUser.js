import { connect } from 'react-redux';
import { login, userLogout } from '../actions/user'
import { useAuth0 } from "../react-auth0-wrapper";

function FetchUser(props) {
  const { isAuthenticated, user } = useAuth0();
  const { dispatch, fetchUser } = props;

  if (!fetchUser.id) {
    if (isAuthenticated) {
      dispatch(login(user.email))
      return null
    }
      return null
  }
    if (isAuthenticated) {
      return null
    }
      dispatch(userLogout())
      return null

}

const mapStateToProps = (state) => {
  return { fetchUser: state.user }
}

export default connect(mapStateToProps)(FetchUser);