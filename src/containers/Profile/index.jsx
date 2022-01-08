import { Add } from '@mui/icons-material';
import { Box, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import AccountList from '../../components/AccountList';
import CustomButton from '../../components/CustomButton';
import ProfileCard from '../../components/ProfileCard';
import { useBankContext } from '../../context/context';
import { ProfileStyled } from './styles';
import { CustomModal } from '../../components/CustomModal'
import CreateAccountForm from '../../components/CreateAccountForm';
const Profile = () => {
  const { state } = useBankContext()
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
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
                <CustomButton onClick={handleOpenModal} variant="contained" endIcon={<Add />}>
                Create new account
                </CustomButton>
                <CustomModal onClose={handleOpenModal} open={openModal}>
                  <CreateAccountForm closeModal={handleOpenModal}/>
                </CustomModal>
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