const userInfo = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER_INFO':
      return action.userInfo
    default:
      return state
  }
}

export default userInfo
