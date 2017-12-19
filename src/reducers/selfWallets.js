const selfWallets = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_WALLETS':
      return action.wallets
    default:
      return state
  }
}

export default selfWallets
