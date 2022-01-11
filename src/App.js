import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import Home from './containers/Home';
import LoginPage from './containers/LoginPage';
import Profile from './containers/Profile';
import { useEffect, useState } from 'react';
import { useBankContext } from './context/context';
import { Backdrop, CircularProgress } from '@mui/material';
import Operations from './containers/Operations';
import AllData from './containers/AllData';
import { useAuth } from './context/authContext';
import { httpPost } from './utils/request';

const theme = createTheme({
  primary: red[900],
  secondary: blue[900]
});


function App() {
  const userType = window.localStorage.getItem('userType')
  const { dispatch, state: { API, currentUser: currentUserBank, creatingUser } } = useBankContext()
  const { currentUser, logout } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        console.log('enter user effect');
        setLoading(true)
        const token = await httpPost(API, '/user/auth', {
          uid: currentUser.uid,
          userType: userType
        })
        window.localStorage.setItem('token', token.body);
        const userData = await httpPost(API, '/user/', {}, token.body)
        dispatch({ type: 'SET_CURRENT_USER', payload: userData.body })
        dispatch({ type: 'UPDATE_BALANCE' })
      } catch (e) {
        console.log(e);
      }
      finally {
        setTimeout(() => {
          setLoading(false)
        })
      }
    };
    if (currentUser && !currentUserBank && !creatingUser) {
      getUserMetadata();
    } else if (currentUser || !currentUserBank) {
      setLoading(false)
    }
  }, [dispatch, userType, logout, API, currentUser, currentUserBank, creatingUser]);

  if (loading) {
    return <>
    <ThemeProvider theme={theme}>
      <Layout>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Layout>
    </ThemeProvider>
    </>
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/all-data" element={<AllData />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
