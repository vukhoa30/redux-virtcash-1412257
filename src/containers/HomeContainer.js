import { connect } from 'react-redux'
import Home from '../components/Home/Home'
import { setCurrentWallets, setCurrentTransactions, setAllTransactions } from '../actions'

const mapStateToProps = (state, ownProps) => ({
  p_selfWallets: state.selfWallets,
  p_selfTransactions: state.selfTransactions,
  p_allTransactions: state.allTransactions,
})

const mapDispatchToProps = {
  p_setCurrentWallets: setCurrentWallets,
  p_setCurrentTransactions: setCurrentTransactions,
  p_setAllTransactions: setAllTransactions,
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
