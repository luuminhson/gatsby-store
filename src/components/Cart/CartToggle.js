import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import StoreContext from '../../context/StoreContext';

import { Button } from '../shared/Buttons';
import OiIcon from '../OiIcon';

import {
  breakpoints,
  colors
} from '../../utils/styles';

const numberEntry = keyframes`
  0%{
    transform: scale(0)
  }
  90% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(0.6);
  }
`;

const ItemsNumber = styled(`span`)`
  align-items: center;
  background: ${colors.mainClickable};
  border-radius: 50%;
  color: ${colors.white};
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  width: 36px;
  height: 36px;
  justify-content: center;
  animation: ${numberEntry} 0.5s ease forwards;
  position: absolute;
  right: -2px;
  top: -2px;
  transform: scale(0.6);
`;

const CartIcon = styled(`div`)`
  border: none;
  border-radius: 0;
  display: flex;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;


const CartToggle = ({ toggle, ...rest }) => (
  <StoreContext.Consumer>
    {({ checkout }) => {

      const itemsInCart = checkout.lineItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return (
        <CartIcon aria-label={`Shopping cart with ${itemsInCart} items`} onClick={toggle} {...rest}>
          <OiIcon icon='oi-icon-cart' />
          {itemsInCart > 0 && (
            <ItemsNumber>{itemsInCart}</ItemsNumber>
          )}
        </CartIcon>
      );
    }}
  </StoreContext.Consumer>
);

CartToggle.propTypes = {
  toggle: PropTypes.func.isRequired
};


export default CartToggle;