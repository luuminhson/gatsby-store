import React from 'react';
import styled from '@emotion/styled';
import CartEmptyImgSrc from '../../imgs/tumbleweed.gif';
import { colors, spacing } from '../../utils/styles';

const EmptyCartRoot = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
`;

const EmptyCartCopy = styled('div')`
  color: ${colors.mainDark};
  margin-top: ${spacing.lg}px;
  max-width: 280px;
  text-align: center;

  p {
    margin: 0;
  }
`;

const CartEmptyImg = styled(`img`)`
  width: 32px;
  height: 32px;
`;

const EmptyCart = () => (
  <EmptyCartRoot>
    <CartEmptyImg src={CartEmptyImgSrc} width='64' height='64' alt='Cart Empty' />
    <EmptyCartCopy>
      <p>Your cart currently does not have any product yet.</p>
    </EmptyCartCopy>
  </EmptyCartRoot>
);

export default EmptyCart;
