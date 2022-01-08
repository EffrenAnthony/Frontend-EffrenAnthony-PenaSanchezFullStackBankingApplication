import { Divider } from '@material-ui/core';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import CustomButton from '../CustomButton';

const CreateAccountForm = ({ closeModal }) => {
  const [accountType, setAccountType] = React.useState('savings');

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    closeModal()
  }
  return (
    <div>
    <h3>Select the account type</h3>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountType}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={'savings'}>Savings</MenuItem>
            <MenuItem value={'checking'}>Checking</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ mt: 3, mb: 3 }} />
        <br></br>
        <CustomButton
          variant="contained"
          color="primary"
          type='submit'
        >Create New Account</CustomButton>
      </form>
    </div>
  );
};

export default CreateAccountForm;