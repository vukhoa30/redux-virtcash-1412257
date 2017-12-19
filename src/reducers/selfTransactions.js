const selfTransactions = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TRANSACTIONS':
      return action.transactions
    default:
      return state
  }
}

export default selfTransactions
