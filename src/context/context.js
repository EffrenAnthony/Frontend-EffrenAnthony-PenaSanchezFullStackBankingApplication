import React, { useContext, useReducer, useEffect } from 'react';
import { initialState } from './initialState';
import { reducers } from './reducers'

const BankContext = React.createContext(initialState)

export function useBankContext () {
  return useContext(BankContext)
}


export const BankProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState)
  const token = window.localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      dispatch({type: 'SET_AUTHORIZATION', payload: token})
    }
  }, [token])
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