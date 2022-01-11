export const reducers = (state, action) => {
  switch (action.type) {
    case 'SET_AUTHORIZATION':
      return {
        ...state,
        authorization: action.payload
      }
    case 'SET_CREATING_USER':
      return {
        ...state,
        creatingUser: action.payload
      }
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: { ...action.payload }
      }
    case 'REMOVE_AUTHORIZATION':
      return {
        ...state,
        authorization: null
      }
    case 'REMOVE_CURRENT_USER':
      return {
        ...state,
        currentUser: null
      }
    case 'UPDATE_BALANCE':
      const newBalance = state.currentUser.accounts.reduce((prev, cur) => {
        return prev + cur.balance
      }, 0)
      return {
        ...state,
        balance: newBalance
      }
    case 'UPDATE_ACCOUNTS':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          accounts: [...action.payload]
        }
      }
    case 'UPDATE_ACCOUNT_BALANCE':
      const account = state.currentUser.accounts.find(account => account.number === Number(action.payload.number))
      const indexOfAccount = state.currentUser.accounts.indexOf(account)
      const copyAccounts = [...state.currentUser.accounts]
      copyAccounts[indexOfAccount].balance = action.payload.balance
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          accounts: [...copyAccounts]
        }
      }
    case 'DELETE_ACCOUNT':
      const deletedAccount = state.currentUser.accounts.find(account => account._id === action.payload)
      const indexOfDeletedAccount = state.currentUser.accounts.indexOf(deletedAccount)
      const copyUserAccounts = [...state.currentUser.accounts]
      copyUserAccounts.splice(indexOfDeletedAccount, 1)
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          accounts: [...copyUserAccounts]
        }
      }
    default:
      return { ...state }
  }
}