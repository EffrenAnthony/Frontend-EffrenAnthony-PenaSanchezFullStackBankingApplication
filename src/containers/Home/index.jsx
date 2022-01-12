import React from 'react';
import BadBankLogo from '../../assets/bank.png'
import MediaCard from '../../components/Card';
import { HomeStyled } from './styles';
import ProfileCard from '../../components/ProfileCard';
import { useBankContext } from '../../context/context';
import { Alert, Snackbar } from '@mui/material';
import { useAuth } from '../../context/authContext';

const Home = () => {

  const { state } = useBankContext()
  const { authSuccess, handleAuthSuccess } = useAuth()
  return (
    <HomeStyled>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={authSuccess}
        autoHideDuration={6000}
        onClose={handleAuthSuccess}
      >
        <Alert onClose={handleAuthSuccess} severity="success" sx={{ width: '100%' }}>
          Authentication has been successfully established
        </Alert>
      </Snackbar>
      <h1>Welcome to Bank Application</h1>
      {
        state.currentUser
          ? <ProfileCard user={state.currentUser} />
          : <MediaCard
            image={BadBankLogo}
            altText='bank-logo'
            title='Bank App'
            description='This is the Bank Application for MIT Capstone Poject with MERN stack'
            cardHeight='340'
          />
      }


    </HomeStyled>
  );
};

export default Home;