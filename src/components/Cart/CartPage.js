import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

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
import OiIcon from '../OiIcon';

const CartPageRoot = styled(`div`)`
  position: relative;
  background: ${colors.white};
  padding: 0;
`;

const Mask = styled(`div`)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.white};
  pointer-events: none;
  opacity: 0;
  z-index: -1;
  transition: all 0.2s ease-in-out;
`;

const CartLoading = css`
  ${Mask} {
    opacity: 0.8;
    z-index: 1000;
  }
`;

const Heading = styled(`header`)`
  background-color: ${colors.white};
  width: calc(100% - ${spacing.lg * 2}px);
  height: 48px;
  box-shadow: 0 1px 0 ${colors.neutral1};
  display: flex;
  padding: 0 0 ${spacing.lg}px;
  margin: 0 ${spacing.lg}px;
  z-index: 3000;

  ${mediaQuery.tabletFrom} {
    align-items: center;
    justify-content: center;
    height: ${dimensions.navHeightTablet};
  }
`;

const Title = styled(FontStyle.body)`
  text-align: center;
  color: ${colors.neutral4};
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
  justify-content: center;
  align-items: center;

  i {
    color: ${colors.mainSupport};
    margin-right: ${spacing.xs}px;
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

class CartPage extends Component {
  state = {
    isLoading: false
  };

  render() {
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
            <CartPageRoot css={this.state.isLoading && CartLoading}>
              <Mask />
              {itemsInCart > 0 &&
                <Heading>
                  <Title>Bạn đang có {itemsInCart} sản phẩm trong giỏ hàng.</Title>
                </Heading>
              }
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
                    </Costs>
                    <ButtonGroup>
                      <CheckOut href={checkout.webUrl}>Đặt hàng →</CheckOut>
                    </ButtonGroup>
                  </CartFooter>
                </>
              ) : (
                  <EmptyCart />
                )}
            </CartPageRoot>
          );
        }}
      </StoreContext.Consumer>
    );
  }
}

export default CartPage;
