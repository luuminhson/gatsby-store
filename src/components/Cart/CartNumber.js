import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import StoreContext from '../../context/StoreContext';

import { colors, fontWeight } from '../../utils/styles';

const numberEntry = keyframes`
  0%{
    transform: scale(0)
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const ItemsNumber = styled(`span`)`
  align-items: center;
  background-color: ${colors.mainClickable};
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: ${fontWeight.body.medium};
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  padding: 0 4px;
  border-radius: 10px;
  animation: ${numberEntry} 0.5s ease forwards;
`;

const CartNumberWrapper = styled(`div`)`
  border: none;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  cursor: pointer;
`;


const CartNumber = ({ number, ...rest }) => (
  <CartNumberWrapper {...rest}>
    {number > 0 && (
      <ItemsNumber>{number}</ItemsNumber>
    )}
  </CartNumberWrapper>
);

CartNumber.propTypes = {
  number: PropTypes.number,
};

export default CartNumber;