import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import OiIcon from '../OiIcon';

import {
  MdArrowBack,
  MdArrowForward
} from 'react-icons/md';

import StoreContext from '../../context/StoreContext';
import CartList from './CartList';
import CartIndicator from './CartIndicator';
import EmptyCart from './EmptyCart';
import { Button, PrimaryButton } from '../shared/Buttons';

import {
  breakpoints,
  colors,
  fontFamily,
  spacing,
  dimensions,
  mediaQuery
} from '../../utils/styles';

const CartRoot = styled(`div`)`
  background: ${colors.white};
  bottom: 0;
  position: fixed;
  right: 0;
  top: -1px;
  transform: translateX(100%);
  transition: transform 0.4s;
  width: 100%;
  will-change: transform;
  z-index: 3000;

  &.open {
    transform: translateX(0%);
  }

  &.closed {
    transform: translateX(100%);
  }

  ::after {
    background-color: ${colors.white};
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 250ms;
  }

  &.loading {
    ::after {
      opacity: 0.9;
      pointer-events: all;
    }
  }

  ${mediaQuery.tabletFrom} {
    width: ${dimensions.cartWidthDesktop};

    &.covered {
      display: none;
    }
  }
`;

const Heading = styled(`header`)`
  align-items: center;
  display: flex;
  height: ${dimensions.headerHeight};
  justify-content: flex-start;
`;

const Title = styled(`h2`)`
  flex-grow: 1;
  font-family: ${fontFamily.heading};
  font-size: 1.8rem;
  left: -${dimensions.headerHeight};
  margin: 0;
  margin-left: ${spacing.md}px;
  position: relative;

  .open & {
    margin-left: calc(${dimensions.headerHeight} + ${spacing.md}px);

    @media (min-width: ${breakpoints.desktop}px) {
      margin-left: ${spacing.md}px;
    }
  }
`;

const Content = styled(`div`)`
  overflow-y: auto;
  padding: ${spacing.lg}px;
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    ::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.neutral2};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.mainClickable};
    }
    ::-webkit-scrollbar-track {
      background: ${colors.neutral1};
    }
  }
`;

const Costs = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: ${spacing.sm}px;
`;

const Cost = styled(`div`)`
  display: flex;
  padding: 0 ${spacing.xs}px ${spacing['2xs']}px;

  :last-child {
    padding-bottom: 0;
  }

  span {
    color: ${colors.textMild};
    flex-basis: 60%;
    font-size: 0.9rem;
    text-align: right;
  }

  strong {
    color: ${colors.lilac};
    flex-basis: 40%;
    text-align: right;
  }
`;

const Total = styled(Cost)`
  border-top: 1px solid ${colors.neutral2};
  color: ${colors.mainDark};
  margin-top: ${spacing.xs}px;
  padding-top: ${spacing.sm}px;

  span {
    font-weight: bold;
    text-transform: uppercase;
  }

  strong,
  span {
    color: inherit;
  }
`;

const CheckOut = styled(PrimaryButton)`
  font-size: 1.25rem;
  margin: ${spacing.lg}px 0 ${spacing.md}px;
  width: 100%;
`;

const BackLink = styled(Button)`
  font-size: 1.25rem;
  margin-bottom: ${spacing.sm}px;
  width: 100%;
`;

class Cart extends Component {
  state = {
    className: 'closed',
    isLoading: false
  };

  componentDidUpdate(prevProps) {
    const componentStatusChanged = prevProps.status !== this.props.status;
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;

    if (componentStatusChanged) {
      this.setState({
        className: this.props.status
      });
    }

    if (this.props.isDesktopViewport) {
      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === 'open') {
          setTimeout(() => {
            this.setState(state => ({
              className: state.className + ' covered'
            }));
          }, 500);
        } else {
          this.setState(state => ({
            className: state.className.replace('covered', '')
          }));
        }
      }
    }
  }

  render() {
    const { toggle } = this.props;
    const { className } = this.state;

    return (
      <StoreContext.Consumer>
        {({ client, checkout, removeLineItem, updateLineItem, adding }) => {
          const setCartLoading = bool => this.setState({ isLoading: bool });

          const handleRemove = itemID => async event => {
            event.preventDefault();
            await removeLineItem(client, checkout.id, itemID);
            setCartLoading(false);
          };

          const handleQuantityChange = lineItemID => async quantity => {
            if (!quantity) {
              return;
            }
            await updateLineItem(client, checkout.id, lineItemID, quantity);
            setCartLoading(false);
          };

          const itemsInCart = checkout.lineItems.reduce(
            (total, item) => total + item.quantity,
            0
          );

          return (
            <CartRoot
              className={`${className} ${
                this.state.isLoading ? 'loading' : ''
                }`}
            >
              <Heading>
                <CartIndicator itemsInCart={itemsInCart} adding={adding} />
                <Title>Your Cart</Title>
                <Button aria-label={`Close Cart`} onClick={toggle}>
                  <OiIcon icon='oi-icon oi-icon-close' />
                </Button>
              </Heading>
              {checkout.lineItems.length > 0 ? (
                <Content>
                  <CartList
                    items={checkout.lineItems}
                    handleRemove={handleRemove}
                    updateQuantity={handleQuantityChange}
                    setCartLoading={setCartLoading}
                    isCartLoading={this.state.isLoading}
                  />

                  <Costs>
                    <Cost>
                      <span>Subtotal:</span>{' '}
                      <strong>USD ${checkout.subtotalPrice}</strong>
                    </Cost>
                    <Cost>
                      <span>Taxes:</span> <strong>{checkout.totalTax}</strong>
                    </Cost>
                    <Cost>
                      <span>Shipping (worldwide):</span> <strong>FREE</strong>
                    </Cost>
                    <Total>
                      <span>Total Price:</span>
                      <strong>USD ${checkout.totalPrice}</strong>
                    </Total>
                  </Costs>

                  <CheckOut href={checkout.webUrl}>
                    Check out <MdArrowForward />
                  </CheckOut>
                  <BackLink onClick={toggle}>
                    <MdArrowBack />
                    Back to shopping
                  </BackLink>
                </Content>
              ) : (
                  <EmptyCart />
                )}
            </CartRoot>
          );
        }}
      </StoreContext.Consumer>
    );
  }
}

Cart.propTypes = {
  toggle: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string
};

export default Cart;
