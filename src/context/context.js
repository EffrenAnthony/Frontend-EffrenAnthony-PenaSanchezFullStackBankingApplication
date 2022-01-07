import React, { useContext, useReducer } from 'react';
import { initialState } from './initialState';
import { reducers } from './reducers'

const BankContext = React.createContext(initialState)

export function useBankContext () {
  return useContext(BankContext)
}

export const BankProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState)

  const value = {
    state,
    dispatch
  }
  return (
    <BankContext.Provider value={value}>
      {children}
    </BankContext.Provider>
  )
}