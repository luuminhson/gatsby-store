import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import StoreContext from '../../context/StoreContext';

import { Button } from '../shared/Buttons';
import OiIcon from '../OiIcon';

import {
    breakpoints,
    colors,
    spacing,
    dimensions
} from '../../utils/styles';

const ItemsNumber = styled(`span`)`
  align-items: center;
  background: ${colors.lemon};
  border-radius: 50%;
  color: ${colors.brandDark};
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  height: 36px;
  justify-content: center;
  width: 36px;
`;

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

const CartIcon = styled(Button)`
  background: ${colors.lightest};
  border: none;
  border-radius: 0;
  display: flex;
  height: ${dimensions.headerHeight};
  justify-content: center;
  left: 0;
  padding: 0;
  position: relative;
  top: 0;
  transform: translateX(calc(-100% - 32px));
  transition: all 0.5s ease;
  width: ${dimensions.headerHeight};

  :focus {
    box-shadow: 0 0 0 1px ${colors.accent} inset;
  }

  .open & {
    background: ${colors.lilac};
    color: ${colors.lightest};
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

  ${ItemsNumber} {
    animation: ${numberEntry} 0.5s ease forwards;
    position: absolute;
    right: -20px;
    top: -20px;
    transform: scale(0.6);
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