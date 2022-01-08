import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AddCard, RemoveCircle, SwapHoriz } from '@mui/icons-material';
import { useBankContext } from '../../context/context';
import Deposit from '../../components/Deposit';
import Withdraw from '../../components/Withdraw';
import Transfer from '../../components/Transfer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Operations() {
  const [value, setValue] = React.useState(0);
  const { state: { currentUser: user } } = useBankContext()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userAccounts = () => {
    if (user) {
      return user.accounts.map(account => {
        return {
          label: account.number + ' - USD ' + account.balance,
          id: account._id
        }
      })
    }
    return []
  }
  return (
    <>
      <Container maxWidth='md' sx={{ mt: 7 }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="secondary" textColor="secondary">
              <Tab label={<div>Deposit <AddCard /></div>} {...a11yProps(0)} />
              <Tab label={<div>Withdraw <RemoveCircle /></div>}  {...a11yProps(1)} />
              <Tab label={<div>Transfer <SwapHoriz /></div>} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Deposit userAccounts={userAccounts} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Withdraw userAccounts={userAccounts} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Transfer userAccounts={userAccounts} />
          </TabPanel>
        </Box>

      </Container>
    </>
  );
}