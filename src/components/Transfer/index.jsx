import React, { useState } from 'react';
import { useBankContext } from '../../context/context';
import { httpPost } from '../../utils/request';
import BankForm from '../BankForm';
import LoadingBackdrop from '../LoadingBackdrop';

const Transfer = ({
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
    const newBalance = Number(data.oldBalance) - Number(data.amount)
    const accountId = data.accountId
    const accountNumberTo = data.destAccount
    const amount =data.amount
    try {
      const updatedAccount = await httpPost(state.API, '/account/transfer', {
        accountIdFrom: accountId,
        accountNumberTo,
        newBalanceFrom: newBalance,
        amount
      }, state.authorization)
      console.log(updatedAccount);
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
            opType='TRA'
            title='Transfer'
            success={success}
            onSuccess={handleSuccess}
            error={error}
          />
      }
    </div>
  );
};

export default Transfer;