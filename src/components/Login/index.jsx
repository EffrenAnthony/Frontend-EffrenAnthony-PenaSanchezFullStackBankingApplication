/* eslint-disable no-control-regex */
import { Email, Password } from '@mui/icons-material';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useBankContext } from '../../context/context';
import { httpPost } from '../../utils/request';
import AuthForm from '../AuthForm';
import LoadingBackdrop from '../LoadingBackdrop';


const Login = () => {
  // const authErrorInitial = window.localStorage.getItem('authError') === 'true' ? true : false;
  const { state, dispatch } = useBankContext()
  const {
    login,
    logout,
    handleAuthError,
    authError,
    loadingAuth,
    handleLoadingAuth,
    signInWithGoogle,
    handleAuthSuccess
  } = useAuth()
  const navigate = useNavigate()

  const handleRegisterWithPass = async (data) => {
    try {
      handleLoadingAuth(true)
      dispatch({ type: 'SET_CREATING_USER', payload: true })
      const response = await login(data.email, data.password)
      const token = await httpPost(state.API, '/user/auth', {
        uid: response.user.uid,
        userType: data.userType,
      })
      const userData = await httpPost(state.API, '/user/', {}, token.body)
      if (userData.error.length <= 0) {
        window.localStorage.setItem('userType', data.userType)
        window.localStorage.setItem('token', token.body);
        dispatch({ type: 'SET_CURRENT_USER', payload: userData.body })
        dispatch({ type: 'UPDATE_BALANCE' })
        handleLoadingAuth(false)
        handleAuthSuccess()
        navigate('/')
      } else {
        // window.localStorage.setItem('authError', true)
        handleAuthError()
        logout()
      }
      dispatch({ type: 'SET_CREATING_USER', payload: false })
    } catch (error) {
      // window.localStorage.setItem('authError', true)
      console.log(error)
      handleAuthError()
      handleLoadingAuth(false)
      // setAuthErrorMessage(userData.error)
    } finally {
      handleLoadingAuth(false)
    }
  }

  const handleLoginGoogle = async (data) => {
    try {
      handleLoadingAuth(true)
      dispatch({ type: 'SET_CREATING_USER', payload: true })
      const response = await signInWithGoogle()
      const token = await httpPost(state.API, '/user/auth', {
        uid: response.user.uid,
        userType: data.userType,
        email: response.user.email,
        picture: response.user.photoURL,
        name: response.user.displayName,
      })
      const userData = await httpPost(state.API, '/user/', {}, token.body)
      if (userData.error.length <= 0) {
        window.localStorage.setItem('userType', data.userType)
        window.localStorage.setItem('token', token.body);
        dispatch({ type: 'SET_CURRENT_USER', payload: userData.body })
        dispatch({ type: 'UPDATE_BALANCE' })
        handleLoadingAuth(false)
        handleAuthSuccess()
        navigate('/')
      } else {
        // window.localStorage.setItem('authError', true)
        handleAuthError()
        logout()
      }
      dispatch({ type: 'SET_CREATING_USER', payload: false })
    } catch (err) {
      handleAuthError()
      handleLoadingAuth(false)
    } finally {
      handleLoadingAuth(false)
    }
  }
  const loginConfig = [
    {
      label: 'Email',
      placeholder: 'Write your email',
      name: 'email',
      icon: <Email />,
      type: 'email',
      required: true,
      helperText: '',
      errorText: 'Write a valid email',
      validator: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    {
      label: 'Password',
      placeholder: 'Write a password',
      name: 'password',
      icon: <Password />,
      type: 'password',
      required: true,
      helperText: '',
      errorText: '',
      validator: null
    }
  ]
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={authError}
        autoHideDuration={3000}
        onClose={handleAuthError}
      >
        <Alert onClose={handleAuthError} severity="error" sx={{ width: '100%' }}>
          Wrong credentials or User type.
        </Alert>
      </Snackbar>
      {
        loadingAuth
          ? <LoadingBackdrop loading={loadingAuth} />
          : <AuthForm
            title='Login'
            authType='LOGIN'
            handle={handleRegisterWithPass}
            formConfig={loginConfig}
            authGoogle={handleLoginGoogle}
          />
      }

    </div>
  );
};

export default Login;