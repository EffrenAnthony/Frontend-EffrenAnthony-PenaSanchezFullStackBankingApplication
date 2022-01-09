import styled from 'styled-components'

export const ProfileStyled = styled.div`
  .profile__balance{
    padding: 10px;
    display: grid;
    place-items: center;
    box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    -webkit-box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    -moz-box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    border-radius: 10px;
    color: #2d2c2c;
  }
  .profile__accounts{
    padding: 10px;
    box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    -webkit-box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    -moz-box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    border-radius: 10px;
    color: #2d2c2c;
    max-height: 50vh;
    overflow-y: scroll;
  }

`
