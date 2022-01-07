export const reducers = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: {...action.payload}
      }
    case 'UPDATE_BALANCE':
      const newBalance = state.currentUser.accounts.reduce((prev,cur) => {
        return prev + cur.balance
      },0)
      return {
        ...state,
        balance: newBalance
      }
    default:
      return {...state}
  }
}