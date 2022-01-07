import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';
import { ButtonStyled } from './styles';

const CustomButton = ({ onClick, variant, color, children, endIcon }) => {
  const NewButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.primary
  }));
  return (
    <ButtonStyled>
      <NewButton onClick={onClick} variant={variant} color={color} endIcon={endIcon}>{children}</NewButton>
    </ButtonStyled>
  );
};

export default CustomButton;