import React, { Component } from 'react';
import styled from '@emotion/styled';

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

const CartPageRoot = styled(`div`)`
  background: ${colors.white};
  padding: 0;

  &.loading {
    ::after {
      opacity: 0.9;
      pointer-events: all;
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

const Shipping = styled(FontStyle.smallbody)`
  text-align: center;
  color: ${colors.neutral4};
  margin-top: ${spacing.lg}px;
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
                        <CartPageRoot className={this.state.isLoading ? 'loading' : ''}>
                            {/* {console.log(checkout)} */}
                            <Heading>
                                <Title>
                                    <span>Cart</span>
                                    {itemsInCart > 0 && <ItemsNumber>{itemsInCart}</ItemsNumber>}
                                </Title>
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
                                                <span>Subtotal</span>{' '}
                                                <strong>{priceWithCommas(checkout.subtotalPrice)} VND</strong>
                                            </Cost>
                                            {checkout.totalTax > 0 &&
                                                <Cost>
                                                    <span>Taxes:</span> <strong>{checkout.totalTax}</strong>
                                                </Cost>
                                            }
                                            <Shipping>Shipping cost will be calculated at checkout.</Shipping>
                                        </Costs>
                                        <ButtonGroup>
                                            <CheckOut href={checkout.webUrl}>Check out</CheckOut>
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
