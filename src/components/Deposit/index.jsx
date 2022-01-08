import React, { useState } from 'react';
import { useBankContext } from '../../context/context';
import BankForm from '../BankForm';

const Deposit = ({
  userAccounts
}) => {
  const { dispatch } = useBankContext()
  const [success, setSucces] = useState(false)
  const handleSuccess = () => {
    setSucces(!success)
  }
  const handle = (data) => {
    const newBalance = Number(data.oldBalance) + Number(data.amount)
    dispatch({ type: 'UPDATE_ACCOUNT_BALANCE', payload: {
      number: data.account,
      balance: newBalance
    }})
    dispatch({ type: 'UPDATE_BALANCE' })
    handleSuccess()
  }
  return (
    <div>
      <BankForm
        comboItems={userAccounts()}
        handle={handle}
        opType='DEP'
        title='Deposit'
        success={success}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Deposit;