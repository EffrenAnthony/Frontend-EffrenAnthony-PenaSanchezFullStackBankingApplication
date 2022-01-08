import React from 'react';
import BankForm from '../BankForm';

const Transfer = ({
  userAccounts
}) => {
  const handle = (data) => {
  }
  return (
    <div>
      <BankForm
        comboItems={userAccounts()}
        handle={handle}
        opType='TRA'
        title='Transfer'
      />
    </div>
  );
};

export default Transfer;