import React, { useState } from 'react';
import { useBankContext } from '../../context/context';
import { httpPost } from '../../utils/request';
import BankForm from '../BankForm';
import LoadingBackdrop from '../LoadingBackdrop';

const Deposit = ({
  userAccounts
}) => {
  const { dispatch, state } = useBankContext()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSuccess = () => {
    setSuccess(!success)
  }
  const handle = async (data) => {
    setError(false)
    setLoading(true)
    const newBalance = Number(data.oldBalance) + Number(data.amount)
    const accountId = data.accountId
    try {
      const updatedAccount = await httpPost(state.API, 'account', {
        newBalance,
        accountId
      }, state.authorization)
      if (updatedAccount) {
        dispatch({
          type: 'UPDATE_ACCOUNT_BALANCE', payload: {
            number: data.account,
            balance: newBalance
          }
        })
        dispatch({ type: 'UPDATE_BALANCE' })
        handleSuccess()
      }
    } catch (err) {
      console.log(err);
      setError(true)
    } finally {
      handleSuccess()
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }
  return (
    <div>
      {
        loading
          ? <LoadingBackdrop loading={loading} />
          :
          <BankForm
            comboItems={userAccounts()}
            handle={handle}
            opType='DEP'
            title='Deposit'
            success={success}
            onSuccess={handleSuccess}
            error={error}
          />
      }
    </div>
  );
};

export default Deposit;