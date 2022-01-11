import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Divider, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, Paper, Switch, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import { AuthFormStyles } from './styles';

const AuthForm = ({
  title,
  handle,
  formConfig,
  authGoogle
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)
  const [userType, setUserType] = useState('customer')
  const initialFormValues = formConfig.reduce((prev, cur) => {
    return { ...prev, [cur.name]: '' }
  }, {})
  const initialErrorVlaues = formConfig.reduce((prev, cur) => {
    return { ...prev, [cur.name]: false }
  }, {})
  const [formValue, setFormValue] = useState(initialFormValues)
  const [formErrorValue, setFormErrorValue] = useState(initialErrorVlaues)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setUserType('employee')
    } else {
      setUserType('customer')
    }
  };

  const handleInput = (e, key) => {
    // handle general errors
    if (formConfig[key].validator) {
      if (formConfig[key].validator.test(
        e.target.value
      )) {
        setFormErrorValue({
          ...formErrorValue,
          [e.target.name]: false
        })
      } else {
        setFormErrorValue({
          ...formErrorValue,
          [e.target.name]: true
        })
      }
    }

    // handle confirm password error
    if (formConfig[key].name === 'confirmPassword') {
      if (e.target.value === formValue.password) {
        setFormErrorValue({
          ...formErrorValue,
          [e.target.name]: false
        })
      } else {
        setFormErrorValue({
          ...formErrorValue,
          [e.target.name]: true
        })
      }
    }
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }
  const handleAuthForm = (e) => {
    e.preventDefault()
    handle({ ...formValue, userType })

  }
  const handleDisableSubmit = () => {
    const searchNotFilleds = Object.values(formValue).some(value => value.length <= 0)
    const searchErrors = Object.values(formErrorValue).some(value => value)
    if (searchErrors || searchNotFilleds) {
      return true
    }
    return false
  }

  const handleAuthGoogle = () => {
    authGoogle({ userType })
  }
  return (
    <AuthFormStyles>
      <Paper elevation={3} sx={{ p: 2 }}>
        <>
          <Alert severity='info'>
            Choose the correct <strong>user type </strong>for your account.
          </Alert>
          <h1>{title}</h1>
          <form onSubmit={handleAuthForm}>
            <Grid container spacing={2}>
              {
                formConfig.map((input, key) => (
                  <Grid item lg={12} xs={12} key={key}>
                    <TextField
                      value={formValue[input.name]}
                      error={formErrorValue[input.name]}
                      required={input.required}
                      label={input.label}
                      placeholder={input.placeholder}
                      name={input.name}
                      onChange={(e) => handleInput(e, key)}
                      type={input.type === 'password' ?
                        showPassword ? 'text' : 'password'
                        : input.type}
                      id="outlined-start-adornment"
                      sx={{ width: '100%' }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">{input.icon}</InputAdornment>,
                        endAdornment:
                          <>
                            {
                              input.type === 'password' ?
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                                : <></>

                            }
                          </>
                      }}
                      helperText={formErrorValue[input.name] ? input.errorText : input.helperText}
                    />
                  </Grid>
                ))
              }

            </Grid>
            <br />
            <Divider />
            <br />
              <Grid item lg={12} xs={12}>
                <FormHelperText>User Type</FormHelperText>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleCheck}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label={userType.toUpperCase()}
                />
              </Grid>
            <br />
            <CustomButton
              variant="contained"
              color="primary"
              type='submit'
              disabled={handleDisableSubmit()}
            >{title}</CustomButton>
          </form>
          <br />
          <Button startIcon={<Google />} onClick={handleAuthGoogle}> Login with Google</Button>
        </>
      </Paper>
    </AuthFormStyles>
  );
};

export default AuthForm;