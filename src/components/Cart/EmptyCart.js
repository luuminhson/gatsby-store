import React from 'react';
import styled from '@emotion/styled';
import CartEmptyImgSrc from '../../imgs/tumbleweed.gif';
import { colors, spacing, mediaQuery } from '../../utils/styles';

const EmptyCartRoot = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    justify-content: center;
    align-items: center;
    padding: ${spacing['4xl']}px;
  }
`;

const EmptyCartCopy = styled('div')`
  color: ${colors.mainDark};
  margin-top: ${spacing.lg}px;

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
      <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
    </EmptyCartCopy>
  </EmptyCartRoot>
);

export default EmptyCart;
