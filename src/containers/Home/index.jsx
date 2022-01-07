import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import BadBankLogo from '../../assets/bank.png'
import MediaCard from '../../components/Card';
import { HomeStyled } from './styles';
import ProfileCard from '../../components/ProfileCard';
import { useBankContext } from '../../context/context';

const Home = () => {
  const { isAuthenticated } = useAuth0()

  const { state } = useBankContext()

  console.log(state);
  return (
    <HomeStyled>
      <h1>Welcome to Bank Application</h1>
      {
        isAuthenticated
        ? <ProfileCard user={state.currentUser}/>
        : <MediaCard 
          image={BadBankLogo}
          altText='bank-logo'
          title='Bank App'
          description='This is the Bank Application for MIT Capstone Poject with MERN stack'
          cardHeight='340'
        />
      }
      
      
    </HomeStyled>
  );
};

export default Home;