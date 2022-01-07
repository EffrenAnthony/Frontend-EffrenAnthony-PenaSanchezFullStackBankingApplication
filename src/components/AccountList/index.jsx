import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const AccountList = ({ accounts }) => {
  return (
    <div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          accounts.map((account) => (
            <div key={account._id}>
              <ListItem alignItems="flex-start"
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                }>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={account.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`USD ${account.balance}`}
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
    </div>
  );
};

export default AccountList;