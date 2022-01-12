/* eslint-disable no-control-regex */
import { Email, Password, Person } from '@mui/icons-material';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useBankContext } from '../../context/context';
import { httpPost } from '../../utils/request';
import AuthForm from '../AuthForm';
import LoadingBackdrop from '../LoadingBackdrop';

const Register = () => {
  const { state, dispatch } = useBankContext()
  const {
    register,
    handleAuthError,
    authError,
    loadingAuth,
    handleLoadingAuth,
    signInWithGoogle,
    logout,
    handleAuthSuccess
  } = useAuth()
  const navigate = useNavigate()
  const handleRegisterWithPass = async (data) => {
    try {
      handleLoadingAuth(true)
      dispatch({ type: 'SET_CREATING_USER', payload: true })
      window.localStorage.setItem('userType', data.userType)
      const response = await register(data.email, data.password)
      const token = await httpPost(state.API, '/user/auth', {
        uid: response.user.uid,
        userType: data.userType,
        email: response.user.email,
        picture: `https://avatars.dicebear.com/api/initials/${data.name[0] + data.lastName[0]}.svg`,
        name: data.name + data.lastName
      })
      window.localStorage.setItem('token', token.body);
      const userData = await httpPost(state.API, '/user/', {}, token.body)
      dispatch({ type: 'SET_CURRENT_USER', payload: userData.body })
      dispatch({ type: 'UPDATE_BALANCE' })
      dispatch({ type: 'SET_CREATING_USER', payload: false })
      handleLoadingAuth(false)
      handleAuthSuccess()
      navigate('/')
    } catch (err) {
      handleAuthError()
      handleLoadingAuth(false)
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
  const registerConfig = [
    {
      label: 'Name',
      placeholder: 'Write your last name',
      name: 'name',
      icon: <Person />,
      type: 'text',
      required: true,
      helperText: '',
      errorText: '',
      validator: null
    },
    {
      label: 'Last Name',
      placeholder: 'Write your last name',
      name: 'lastName',
      icon: <Person />,
      type: 'text',
      required: true,
      helperText: '',
      errorText: '',
      validator: null
    },
    {
      label: 'Email',
      placeholder: 'Write your email',
      name: 'email',
      icon: <Email />,
      type: 'text',
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
      helperText: 'At least 8 characters, 1 number, 1 upper and 1 lowercase',
      errorText: 'At least 8 characters, 1 number, 1 upper and 1 lowercase',
      validator: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    },
    {
      label: 'Confirm Password',
      placeholder: 'Confirm your Password',
      name: 'confirmPassword',
      icon: <Password />,
      type: 'password',
      required: true,
      helperText: '',
      errorText: "Passwords don't match",
      validator: null
    },
  ]
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={authError}
        autoHideDuration={6000}
        onClose={handleAuthError}
      >
        <Alert onClose={handleAuthError} severity="error" sx={{ width: '100%' }}>
          Something wnet wrong, maybe Email in use
        </Alert>
      </Snackbar>
      {
        loadingAuth
          ? <LoadingBackdrop loading={loadingAuth} />
          :
          <AuthForm
            title='Register'
            authType='REGISTER'
            handle={handleRegisterWithPass}
            formConfig={registerConfig}
            authGoogle={handleLoginGoogle}
          />
      }
    </div>
  );
};

export default Register;