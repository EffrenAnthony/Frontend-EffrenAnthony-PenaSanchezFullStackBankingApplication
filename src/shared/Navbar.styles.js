import styled from 'styled-components'

export const NavbarStyled = styled.div`
  .mit-logo{
    width: 100% !important;
  }
  .nav-link{
    color: black;
    text-decoration: none;
    &-active{
      text-decoration: none;
      color: #b71c1c;
      svg{
        color: #b71c1c;
      }
    }
  }
`