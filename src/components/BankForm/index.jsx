import {
  Alert,
  AlertTitle,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useBankContext } from '../../context/context';
import CustomButton from '../CustomButton';

const BankForm = ({
  comboItems,
  handle,
  opType,
  title,
  success,
  onSuccess,
  error
}) => {
  const { state: { balance: totalBalance } } = useBankContext()
  const [comboValue, setComboValue] = useState('')
  const [amount, setAmount] = useState('0')
  const [account, setAccount] = useState()
  const [accountId, setAccountId] = useState('')
  const [destAccount, setDestAccount] = useState('')
  const [balance, setBalance] = useState('0')
  const [destAccountError, setDestAccountError] = useState()

  useEffect(() => {
    if (comboItems) {
      const accountSelectedArray = comboItems[0]?.label.split(' ')
      const accountSelectedId = comboItems[0]?.id
      const balance = accountSelectedArray && accountSelectedArray[accountSelectedArray?.length - 1]
      const accountSelected = accountSelectedArray && accountSelectedArray[0]
      setComboValue({
        label: comboItems[0]?.label,
        id: accountSelectedId
      })
      setBalance(balance)
      setAccount(accountSelected)
      setAccountId(accountSelectedId)
    }
  }, [comboItems])

  const stringToNumber = (string) => {
    let str = string
    let num = str.replace(/\D/g, '')
    let value = parseInt(num);
    return value
  }
  const handleCombo = (e) => {
    const valueParsed = JSON.parse(e.target.value)
    const accountSelectedArray = valueParsed.label.split(' ')
    const accountSelected = accountSelectedArray[0]
    const balance = accountSelectedArray[accountSelectedArray.length - 1]
    setBalance(Number(balance))
    setAccount(accountSelected)
    setAccountId(valueParsed.id)
    setComboValue(valueParsed)
  }

  const handleAmmount = (e) => {
    let value = stringToNumber(e.target.value)
    let ammountFormated = (Number(value)).toLocaleString('de-DE')
    if (ammountFormated === 'NaN') {
      setAmount('0')
    } else if (Number(value) < 999999999) {
      setAmount(ammountFormated)
    }
  }

  const handleDestAccount = (e) => {
    if (e.target.value.length < 11) {
      setDestAccountError('Account should have at least 11 characters')
    } else {
      setDestAccountError(null)
    }
    if (e.target.value.length <= 11 && !isNaN(Number(e.target.value))) {
      setDestAccount(e.target.value)
    }
  }
  const handleBankForm = (e) => {
    e.preventDefault()
    let data = {
      account,
      amount: stringToNumber(amount),
      destAccount,
      oldBalance: balance,
      accountId
    }
    handle(data)
    setAmount('0')
    setDestAccount('')
  }

  const handleDisableSubmit = () => {
    const realAmount = stringToNumber(amount)
    let disable
    if (
      comboValue?.length <= 0 ||
      Number(realAmount) <= 0
    ) {
      disable = true
      return disable
    }

    if (opType === 'WIT') {
      if (Number(realAmount) > Number(balance)) {
        disable = true
        return disable
      }
    }

    if (opType === 'TRA') {
      if (
        destAccountError ||
        destAccount.length <= 0 ||
        Number(realAmount) > Number(balance)
      ) {
        disable = true
        return disable
      }
    }

    disable = false
    return disable

  }

  const getAlertSeverity = () => {
    if (opType === 'DEP') {
      return 'success'
    } else if (opType === 'WIT') {
      return 'warning'
    } else if (opType === 'TRA') {
      return 'info'
    }
  }

  const helperTexts = [
    {
      title: 'Deposit',
      text: `You can't ${title} more than USD 999,999,999`
    },
    {
      title: 'Withdraw',
      text: `You can't ${title} more than your balance of USD ${balance}`
    },
    {
      title: 'Transfer',
      text: `You can't ${title} more than your balance of USD ${balance}`
    },
  ]

  const SuccessComponent = () => {
    return (
      <>
        {
          !error ?
            <Alert severity='success'>
              <AlertTitle><strong>Successful Operation</strong></AlertTitle>
            </Alert>
            : <Alert severity='error'>
              <AlertTitle><strong>Something went wrong</strong></AlertTitle>
            </Alert>

        }
        <br />
        <Divider />
        <br />
        <CustomButton
          variant="contained"
          color="primary"
          type='submit'
          onClick={onSuccess}
        >Make other {title}</CustomButton>
      </>
    )
  }
  return (
    <div>
      <Paper elevation={3} sx={{ p: 2 }}>

        {
          success
            ? <>
              <SuccessComponent />
            </>
            : <>
              <Alert severity={getAlertSeverity()}><strong>{title}</strong></Alert>
              <p>Total Balance: USD {(Number(totalBalance)).toLocaleString('de-DE')}</p>
              <h1>Balance: USD {(Number(balance)).toLocaleString('de-DE')}</h1>
              <form onSubmit={handleBankForm}>
                <Grid container spacing={2}>
                  <Grid item lg={12} xs={12} >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Account</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={comboValue === undefined ? '' : JSON.stringify(comboValue)}
                        label="Age"
                        onChange={handleCombo}
                        sx={{ width: '100%' }}
                      >
                        {
                          comboItems.map((item, key) => (
                            <MenuItem value={JSON.stringify({
                              label: item.label,
                              id: item.id
                            })} key={key}>{item.label}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={opType !== 'TRA' ? 12 : 6} xs={12} >
                    <TextField
                      value={amount}
                      required
                      label="Ammount"
                      onChange={handleAmmount}
                      id="outlined-start-adornment"
                      sx={{ width: '100%' }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">USD</InputAdornment>,
                      }}
                      helperText={helperTexts.find((helper) => helper.title === title).text}
                    />
                  </Grid>
                  {
                    opType === 'TRA' &&
                    <Grid item lg={6} xs={12} >
                      <TextField
                        error={destAccountError}
                        value={destAccount}
                        required
                        id="outlined-required"
                        label="Destination Account"
                        sx={{ width: '100%' }}
                        onChange={handleDestAccount}
                        helperText={destAccountError}
                      />

                    </Grid>
                  }
                </Grid>
                <br />
                <Divider />
                <br />
                <CustomButton
                  variant="contained"
                  color="primary"
                  type='submit'
                  disabled={handleDisableSubmit()}
                >{title}</CustomButton>
              </form>
            </>
        }
      </Paper>
    </div>
  );
};

export default BankForm;