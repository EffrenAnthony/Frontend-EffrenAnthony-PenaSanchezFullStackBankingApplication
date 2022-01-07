import React from 'react';
import { Avatar, Box, Grid } from '@mui/material';
import { ProfileStyled } from './styles';
import { AccountCircle, AssignmentInd } from '@mui/icons-material';


const ProfileCard = ({ user }) => {

  return (
    <ProfileStyled>
        <div className="profile-card">
          <div className="profile-card__image">
          </div>
          <div className="profile-card__content">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item md={4} >
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.profilePhoto}
                    sx={{ width: 120, height: 120 }}
                  />
                </Grid>
                <Grid item md={8} >
                  <h2>{user?.fullName}</h2>
                  <h3>{user?.email}</h3>
                  {
                    user?.userType === 'customer'
                    ? <h3><AccountCircle/> {user?.userType?.toLocaleUpperCase()}</h3>
                    : <h3><AssignmentInd/> {user?.userType?.toLocaleUpperCase()}</h3>
                  }
                  
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      {/* {accountType}
      {user.name}
      {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )} */}
    </ProfileStyled>
  );
};

export default ProfileCard;