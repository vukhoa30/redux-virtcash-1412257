import { combineReducers } from 'redux'
import userInfo from './userInfo'
import allTransactions from './allTransactions'
import selfTransactions from './selfTransactions'
import selfWallets from './selfWallets'
import { reducer as formReducers } from 'redux-form'

const virtCashApp = combineReducers({
  userInfo,
  allTransactions,
  selfTransactions,
  selfWallets,
  form: formReducers
})

export default virtCashApp
