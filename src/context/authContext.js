import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'

const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [authError, setAuthError] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user ? user : null)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  // useEffect(() => {
  //   console.log('The user is', currentUser)
  // }, [currentUser])

  function handleLoadingAuth (value) {
    setLoadingAuth(value)
  }
  function handleAuthError() {
    setAuthError(!authError)
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `${process.env.REACT_APP_URL}/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    setCurrentUser(null)
    return signOut(auth)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    handleAuthError,
    authError,
    loadingAuth,
    handleLoadingAuth 
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}