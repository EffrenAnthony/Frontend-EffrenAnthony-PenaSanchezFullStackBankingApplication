import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { LoginStyled } from './styles';
import CustomButton from '../../components/CustomButton';

const Login = () => {

  const { loginWithRedirect } = useAuth0();

  const handleAuthOAsCustomer = () => {
    window.localStorage.setItem('userType', 'customer')
    loginWithRedirect()
  }
  const handleAuthOAsEmployee= () => {
    window.localStorage.setItem('userType', 'employee')
    loginWithRedirect()
  }
  return (
    <LoginStyled>
      <Container maxWidth="md" sx={{ mt: 7 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={4} >
            </Grid>
            <Grid item md={4}>
              <img src='https://cdn.auth0.com/website/bob/press/logo-dark.png' alt='auth0' />
            </Grid>
            <Grid item md={4}>
            </Grid>
            <Grid item md={2}>
            </Grid>
            <Grid item md={4}>
              <h3>As Customer</h3>
              <CustomButton onClick={handleAuthOAsCustomer} variant="contained" color="primary">Login</CustomButton>
            </Grid>
            <Grid item md={4}>
              <h3>As Employee</h3>
              <CustomButton onClick={handleAuthOAsEmployee} variant="contained" color="primary">Login</CustomButton>
            </Grid>
            <Grid item md={2}>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </LoginStyled>
  );
};

export default Login;