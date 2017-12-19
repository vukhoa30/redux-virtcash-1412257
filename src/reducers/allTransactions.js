const allTransactions = (state = null, action) => {
  switch (action.type) {
    case 'SET_ALL_TRANSACTIONS':
      return action.transactions
    default:
      return state
  }
}

export default allTransactions
