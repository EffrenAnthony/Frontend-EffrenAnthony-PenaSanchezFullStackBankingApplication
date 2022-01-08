import { Add } from '@mui/icons-material';
import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import AccountList from '../../components/AccountList';
import CustomButton from '../../components/CustomButton';
import ProfileCard from '../../components/ProfileCard';
import { useBankContext } from '../../context/context';
import { ProfileStyled } from './styles';

const Profile = () => {
  const { state } = useBankContext()
  return (
    <ProfileStyled>
      <Container maxWidth="lg" sx={{ mt: 7 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 3, md: 8 }}>
            <Grid item lg={7} md={7}>
              <ProfileCard user={state.currentUser}/>
            </Grid>
            <Grid item lg={5} md={5} xs={12}>
              <div className="profile__balance">
                <h2>Balance</h2>
                <h1>USD {(Number(state.balance)).toLocaleString('en-IN')}</h1>
                <CustomButton variant="contained" endIcon={<Add />}>
                Create new account
                </CustomButton>
              </div>
            </Grid>
            <Grid item lg={12} md={12} sx={{width: '100%' }}>
              <div className="profile__accounts">
                <AccountList accounts={state.currentUser?.accounts || []} />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ProfileStyled>
  );
};

export default Profile;