export const setCurrentUserInfo = (userInfo) => ({
  type: 'SET_CURRENT_USER_INFO',
  userInfo
})

export const setCurrentWallets = (wallets) => ({
  type: 'SET_CURRENT_WALLETS',
  wallets
})

export const setCurrentTransactions = (transactions) => ({
  type: 'SET_CURRENT_TRANSACTIONS',
  transactions
})

export const setAllTransactions = (transactions) => ({
  type: 'SET_ALL_TRANSACTIONS',
  transactions
})
