import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import OiIcon from '../OiIcon';

import StoreContext from '../../context/StoreContext';
import CartList from './CartList';
import EmptyCart from './EmptyCart';
import { Button, PrimaryButton } from '../shared/Buttons';
import { priceWithCommas } from '../../utils/helpers';

import {
  breakpoints,
  colors,
  spacing,
  dimensions,
  mediaQuery,
  FontStyle,
  fontFamily,
  fontWeight
} from '../../utils/styles';

const CartRoot = styled(`div`)`
  background: ${colors.white};
  padding: 0;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: calc(100vh + ${spacing.lg}px);
  max-width: 100%;
  overflow-y: scroll;
  opacity: 0;
  will-change: transform;
  transform: translateX(100%);
  z-index: -1;
  box-shadow: 0 0 32px 0 rgba(0,0,0,0.12), 0 40px 80px -20px rgba(0,0,0,0.08);
  transition: all 0.3s ease-in-out;
  -webkit-overflow-scrolling: touch;

  &.open {
    opacity: 1;
    transform: translateX(0);
    z-index: 3000;
  }

  &.closed {
    opacity: 0;
    transform: translateX(100%);
    z-index: -1;
  }

  &.loading {
    ::after {
      opacity: 0.9;
      pointer-events: all;
    }
  }

  ${mediaQuery.tabletFrom} {
    width: ${dimensions.cartWidthDesktop};
    height: auto;
    top: 0;
    left: auto;
    right: 0;
    bottom: 0;
    margin: auto;

    &.covered {
      display: none;
    }
  }
`;

const Heading = styled(`header`)`
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${colors.white};
  width: 100%;
  height: ${dimensions.navHeightMobile};
  box-shadow: 0 1px 0 ${colors.neutral1};
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 ${spacing.xl}px;
  justify-content: flex-start;
  z-index: 3000;

  ${mediaQuery.tabletFrom} {
    height: ${dimensions.navHeightTablet};
  }
`;

const Title = styled(FontStyle.h2)`
  flex-grow: 1;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ItemsNumber = styled(FontStyle.smallbody)`
  margin-left: ${spacing.xs}px;
  background-color: ${colors.mainClickable};
  color: ${colors.white};
  padding: 2px 4px;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  height: 20px;
  min-width: 20px;
  line-height: 16px;

  ${mediaQuery.tabletFrom} {
    height: 24px;
    min-width: 24px;
    line-height: 20px;
  }
`;

const CartCloseBtn = styled(OiIcon)`
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;


const Content = styled(`div`)`
  overflow-y: auto;
  width: 100%;
  padding: ${spacing.lg}px ${spacing.lg}px ${spacing.md}px;

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

const CartFooter = styled(`div`)`
  background-color: ${colors.white};
  padding: 0 ${spacing.lg}px ${spacing.lg}px;
  margin-bottom: ${spacing['4xl'] + 40}px;
`;

const Costs = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Cost = styled(`div`)`
  display: flex;
  align-items: center;
  padding: 0 0 ${spacing['2xs']}px;

  :last-child {
    padding-bottom: 0;
  }

  span {
    flex-basis: 40%;
    font-family: ${fontFamily.heading};
    font-weight: ${fontWeight.heading.medium};
    font-size: 1.2rem;
    text-align: left;
  }

  strong {
    flex-basis: 60%;
    font-family: ${fontFamily.heading};
    font-size: 1.4rem;
    font-weight: 600;
    text-align: right;
  }
`;

const Shipping = styled(FontStyle.body)`
  text-align: center;
  color: ${colors.neutral4};
  margin-top: ${spacing.lg}px;
  display: flex;
  align-items: center;

  i {
    color: ${colors.mainSupport};
    margin-right: ${spacing.xs}px;
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

const ButtonGroup = styled(`div`)`
  display: flex;
  flex-direction: column;
`;

const CheckOut = styled(PrimaryButton)`
  margin: ${spacing.md}px 0 0;
  width: 100%;
`;

const BackLink = styled(Button)`
  margin: ${spacing.md}px 0 0;
  width: 100%;
`;

class Cart extends Component {
  state = {
    className: 'closed',
    isLoading: false
  };

  componentDidUpdate(prevProps) {
    const componentStatusChanged = prevProps.status !== this.props.status;

    if (componentStatusChanged) {
      this.setState({
        className: this.props.status
      });
    }
  }

  render() {
    const { toggle } = this.props;
    const { className } = this.state;

    return (
      <StoreContext.Consumer>
        {({ client, checkout, removeLineItem, updateLineItem }) => {
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
                <Title>
                  <span>Giỏ hàng</span>
                  {itemsInCart > 0 && <ItemsNumber>{itemsInCart}</ItemsNumber>}
                </Title>
                <CartCloseBtn icon='oi-icon-close' onClick={toggle} />
              </Heading>
              {checkout.lineItems.length > 0 ? (
                <>
                  <Content>
                    <CartList
                      items={checkout.lineItems}
                      handleRemove={handleRemove}
                      updateQuantity={handleQuantityChange}
                      setCartLoading={setCartLoading}
                      isCartLoading={this.state.isLoading}
                    />
                  </Content>
                  <CartFooter>
                    <Costs>
                      <Cost>
                        <span>Tổng</span>{' '}
                        <strong>{priceWithCommas(checkout.subtotalPrice)} VND</strong>
                      </Cost>
                      {checkout.totalTax > 0 &&
                        <Cost>
                          <span>Thuế:</span> <strong>{checkout.totalTax}</strong>
                        </Cost>
                      }
                      <Shipping><OiIcon icon='oi-icon-check' />Free ship toàn Việt Nam.</Shipping>
                      {/* <Total>
                        <span>Total Price:</span>
                        <strong>USD ${checkout.totalPrice}</strong>
                      </Total> */}
                    </Costs>
                    <ButtonGroup>
                      <CheckOut href={checkout.webUrl}>Đặt hàng →</CheckOut>
                      <BackLink onClick={toggle}>← Tiếp tục mua hàng</BackLink>
                    </ButtonGroup>
                  </CartFooter>
                </>
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
  viewportIs: PropTypes.string,
};

export default Cart;
