import { connect } from 'react-redux'
import App from '../components/App/App'
import { setCurrentUserInfo } from '../actions'

const mapStateToProps = (state, ownProps) => ({
  p_userInfo: state.userInfo
})

const mapDispatchToProps = {
  p_setCurrentUserInfo: setCurrentUserInfo
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
