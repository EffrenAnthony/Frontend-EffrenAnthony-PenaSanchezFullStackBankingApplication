import { Add } from '@mui/icons-material';
import { Alert, Box, Container, Grid, Snackbar } from '@mui/material';
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
  const [successSnackbar, setSuccessSnackbar] = useState(false)
  const [errorSnackbar, setErrorSnackbar] = useState(false)

  const handleSuccessSnackbar = () => {
    setSuccessSnackbar(!successSnackbar)
  }
  const handleErrorSnackbar = () => {
    setErrorSnackbar(!successSnackbar)
  }
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <ProfileStyled>
      <Container maxWidth="lg" sx={{ mt: 7 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 3, md: 8 }}>
            <Grid item lg={7} md={7}>
              <ProfileCard user={state.currentUser} />
            </Grid>
            <Grid item lg={5} md={5} xs={12}>
              <div className="profile__balance">
                <h2>Balance</h2>
                <h1>USD {(Number(state.balance)).toLocaleString('de-DE')}</h1>
                <CustomButton onClick={handleOpenModal} variant="contained" endIcon={<Add />}>
                  Create new account
                </CustomButton>
                <CustomModal onClose={handleOpenModal} open={openModal}>
                  <CreateAccountForm
                    closeModal={handleOpenModal}
                    onSuccess={handleSuccessSnackbar}
                    onError={handleErrorSnackbar}
                  />
                </CustomModal>
              </div>
            </Grid>
            <Grid item lg={12} md={12} sx={{ width: '100%' }}>
              <div className="profile__accounts">
                <AccountList
                  accounts={state.currentUser?.accounts || []}
                  onSuccess={handleSuccessSnackbar}
                  onError={handleErrorSnackbar} />
              </div>
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={successSnackbar}
          autoHideDuration={2000}
          onClose={handleSuccessSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="success" sx={{ width: '100%' }} onClose={handleSuccessSnackbar}>
            Success Action
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorSnackbar}
          autoHideDuration={2000}
          onClose={handleErrorSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="error" sx={{ width: '100%' }} onClose={handleErrorSnackbar}>
            Ups! Something went wrong
          </Alert>
        </Snackbar>
      </Container>
    </ProfileStyled>
  );
};

export default Profile;