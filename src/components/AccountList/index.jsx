import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { AccountListStyled } from './styled';
import { CustomModal } from '../CustomModal';
import CustomButton from '../CustomButton';

const DeleteAccount = ({account}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }

  const handleDeleteAccount = () => {
    handleOpenDeleteModal()
  }
  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={handleOpenDeleteModal}>
        <Delete />
      </IconButton>
      <CustomModal onClose={handleOpenDeleteModal} open={openDeleteModal}>
        <h3>Are you sure you want to delete this {account.accountType} Account?</h3>
        <br />
        <CustomButton variant="contained"
          color="primary"
          type='submit'
          onClick={handleDeleteAccount}>Delete</CustomButton>
      </CustomModal>
    </>
  )
}

const AccountList = ({ accounts }) => {
  return (
    <AccountListStyled>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          accounts.map((account) => (
            <div key={account._id}>
              <ListItem alignItems="flex-start"
                secondaryAction={
                  <DeleteAccount account={account}/>
                }>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={account.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`USD ${(Number(account.balance)).toLocaleString('en-IN')}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {account.accountType}
                      </Typography>
                      {` — Nº ${account.number}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />

            </div>
          ))
        }
      </List>
    </AccountListStyled>
  );
};

export default AccountList;