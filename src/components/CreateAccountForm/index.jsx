import { Divider } from '@material-ui/core';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useBankContext } from '../../context/context';
import { httpPost } from '../../utils/request';
import CustomButton from '../CustomButton';

const CreateAccountForm = ({ closeModal, onSuccess, onError }) => {
  const [accountType, setAccountType] = React.useState('savings');
  const { state, dispatch } = useBankContext()

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await httpPost(state.API, '/user/addAccount', {
        userId: state.currentUser._id,
        accountType,
      }, state.authorization)
      dispatch({ type: 'SET_CURRENT_USER', payload: response.body})
      onSuccess()
    } catch (error) {
      console.log(error)
      onError()
    }
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