import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import Home from './containers/Home';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './containers/Login';
import Profile from './containers/Profile';
import { useEffect, useState } from 'react';
import { useBankContext } from './context/context';
import { Alert, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import Operations from './containers/Operations';
import { httpGet, httpPost } from './utils/request';

const theme = createTheme({
  primary: red[900],
  secondary: blue[900]
});


function App() {
  const { getAccessTokenSilently, user, isLoading, logout } = useAuth0()
  const userType = window.localStorage.getItem('userType')
  const { dispatch, state: { API } } = useBankContext()
  const [loading, setLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await httpGet(userDetailsByIdUrl, '', accessToken)
        const user_metadata = metadataResponse
        const token = await httpPost(API, 'user/auth', { ...user_metadata, userType })
        window.localStorage.setItem('token', token.body);
        const userData = await httpPost(API, 'user/', {},token.body)
        dispatch({ type: 'SET_CURRENT_USER', payload: userData.body })
        dispatch({ type: 'UPDATE_BALANCE' })
        setLoading(false)
      } catch (e) {
        if (user) {
          setShowAlert(true)
          setTimeout(() => {
            window.localStorage.removeItem('userType')
            window.localStorage.removeItem('token')
            logout()
          }, 3000);
        }
      }
    };
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub, dispatch, user, userType, logout, API]);

  if (showAlert) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        You don't have permission to log as — <strong>{userType}</strong>
      </Alert>
    )
  }
  if (loading && isLoading) {
    return <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/operations" element={<Operations />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
