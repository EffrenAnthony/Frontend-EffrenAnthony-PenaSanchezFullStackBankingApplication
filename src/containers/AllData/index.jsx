import { MoreVert } from '@mui/icons-material';
import { Avatar, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomModal } from '../../components/CustomModal';
import { useBankContext } from '../../context/context';
import { httpGet } from '../../utils/request';
import { AllDataStyles } from './styles';

const getBalance = (accounts) => {
  const totalBalance = accounts.reduce((prev, cur) => {
    return prev + cur.balance
  }, 0)
  return (Number(totalBalance)).toLocaleString('de-DE')
}

const AccountsInfo = ({ accounts, totalBalance }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }

  return (
    <>
      <IconButton edge="end" aria-label="more" onClick={handleOpenDeleteModal}>
        <MoreVert />
      </IconButton>
      <CustomModal onClose={handleOpenDeleteModal} open={openDeleteModal} width={350}>
        <h2>Accounts</h2>
        <h3>Total Balance: {totalBalance}</h3>
        <br />
        <TableContainer component={Paper} sx={{ width: '100%', overflow: 'scroll' }} >
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Picture</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell align="right">Number</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow
                  key={account._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt="Remy Sharp"
                      src={account?.avatar}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell>{account.accountType}</TableCell>
                  <TableCell align="right">{account.number}</TableCell>
                  <TableCell align="right">{(Number(account.balance)).toLocaleString('de-DE')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomModal>
    </>
  )
}

const AllData = () => {
  const { state: {
    API,
    authorization
  } } = useBankContext()
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      const { body } = await httpGet(API, '/user', authorization)
      setUsers(body)
    }
    getUsers()
  }, [API, authorization])

  return (
    <AllDataStyles>
      <Container maxWidth="lg" sx={{ mt: 7 }}>
        <TableContainer component={Paper} sx={{ width: '100%', overflow: 'scroll' }} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Picture</TableCell>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="right">User Type</TableCell>
                <TableCell align="right">Accounts</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="right">More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.profilePhoto}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell align="left">{user.fullName}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="right">{user.userType}</TableCell>
                  <TableCell align="right">{user.accounts.length}</TableCell>
                  <TableCell align="right">{getBalance(user.accounts)}</TableCell>
                  <TableCell align="right"><AccountsInfo accounts={user.accounts} totalBalance={getBalance(user.accounts)}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </AllDataStyles>
  );
};

export default AllData;