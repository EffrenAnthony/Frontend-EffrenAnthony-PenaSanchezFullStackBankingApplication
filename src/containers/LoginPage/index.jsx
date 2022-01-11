import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { LoginStyled } from './styles';
import { Tab, Tabs } from '@mui/material';
import { Fingerprint, HowToReg } from '@mui/icons-material';
import Register from '../../components/Register';
import Login from '../../components/Login';

const LoginPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
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
  return (
    <LoginStyled>
      <Container maxWidth="md" sx={{ mt: 7 }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="secondary" textColor="secondary">
              <Tab label={<div>Login <Fingerprint /></div>} {...a11yProps(0)} />
              <Tab label={<div>Register <HowToReg /></div>}  {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>
        </Box>
      </Container>
    </LoginStyled>
  );
};

export default LoginPage;