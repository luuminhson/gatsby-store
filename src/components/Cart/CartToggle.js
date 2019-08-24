import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import StoreContext from '../../context/StoreContext';

import { Button } from '../shared/Buttons';
import OiIcon from '../OiIcon';

import {
    breakpoints,
    colors,
    dimensions
} from '../../utils/styles';

const iconEntry = keyframes`
  0%, 50% {
    transform: scale(0)
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

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
  height: 36px;
  justify-content: center;
  width: 36px;
  animation: ${numberEntry} 0.5s ease forwards;
  position: absolute;
  right: -10px;
  top: -10px;
  transform: scale(0.6);
`;

const CartIcon = styled(Button)`
  background: ${colors.white};
  border: none;
  border-radius: 0;
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  position: relative;
  transition: all 0.5s ease;

  :hover,
  :focus {
    box-shadow: none;
  }

  .open & {
    background: ${colors.lilac};
    color: ${colors.white};
    transform: translateX(0);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    .open & {
      transform: translateX(calc(-100% - 32px));
    }
  }

  svg {
    animation: ${iconEntry} 0.75s ease forwards;
    height: 28px;
    margin: 0;
    width: 28px;
  }
`;


const CartToggle = ({ toggle }) => (
    <StoreContext.Consumer>
        {({ checkout }) => {

            const itemsInCart = checkout.lineItems.reduce(
                (total, item) => total + item.quantity,
                0
            );

            return (
                <CartIcon
                    aria-label={`Shopping cart with ${itemsInCart} items`}
                    onClick={toggle}
                >
                    <OiIcon icon='oi-icon oi-icon-cart' />
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