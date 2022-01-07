import styled from 'styled-components'

export const ProfileStyled = styled.div`
  display: grid;
  place-items: center;
  .profile-card{
    box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    -webkit-box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    -moz-box-shadow: 1px 1px 18px 0px rgba(183,28,28,0.1);
    border-radius: 10px;
    color: #2d2c2c;
    position: relative;
    width: 100%;
    text-align: center;
    &__image{
      height: 120px;
      overflow: hidden;
      position: absolute;
      z-index: -1;
      width: 100%;
      background-image: url('https://picsum.photos/200/300');
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 10px;
    }
    &__content{
      .css-11fq0lf-MuiAvatar-root{
        border: 5px solid white
      }
      h2{
        color: white;
        padding: 20px 10px;
      }
      h3{
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
          margin-right: 8px;
          margin-bottom: 3px;
        }
      }
      @media (max-width: 800px) {
        h2{
          color: #2d2c2c;
          padding:  0px;
        }

      }
    }
  }
`
