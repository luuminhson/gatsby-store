import React, { useState } from 'react';
import styled from '@emotion/styled';

import CartThumbail from './CartThumbail';
import { Input } from '../shared/FormElements';
import OiIcon from '../OiIcon';

import { breakpoints, colors, spacing, FontStyle, radius } from '../../utils/styles';
import { priceWithCommas } from '../../utils/helpers';

const CartListItemRoot = styled('li')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.neutral1};
  padding-bottom: ${spacing.lg}px;
  margin-bottom: ${spacing.lg}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Thumbail = styled(CartThumbail)`
  flex-grow: 0;
  margin-right: ${spacing.md}px;
`;

const Info = styled('div')`
  flex-grow: 1;
`;

const Name = styled(FontStyle.headline)`
  display: block;
`;

const Meta = styled('span')`
  color: ${colors.textLight};
  display: block;
  font-size: 0.95rem;
  font-style: normal;

  span {
    display: block;
  }
`;

const Quantity = styled(Input)`
  flex-grow: 0;
  height: 44px;
  padding: 0 ${spacing.xs}px 0;
  text-align: center;
  width: 50px;

  @media (min-width: ${breakpoints.desktop}px) {
    width: 70px;
  }
`;

const RemoveItem = styled(`div`)`
  display: inline-flex;
  align-items: center;
  border-radius: ${radius.default}px;
  padding-right: ${spacing.xs}px;
  margin-top: ${spacing.xs}px;
  background-color: ${colors.neutral1};
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutral2};
  }

  span {
    color: ${colors.neutral3};
    font-size: 0.9rem;
  }
`;

const Remove = styled(OiIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  height: 24px;
  width: 24px;
  cursor: pointer;
  border-radius: 24px;
  color: ${colors.neutral3};
`;

export default ({
  item,
  setCartLoading,
  updateQuantity,
  handleRemove,
  isCartLoading
}) => {
  const [quantity, setQuantity] = useState(1);

  if (item.quantity !== quantity && quantity !== '' && !isCartLoading) {
    setQuantity(item.quantity);
  }

  const handleInputChange = event => {
    if (isCartLoading) {
      return;
    }

    const value = event.target.value;

    // Make sure the quantity is always at least 1.
    const safeValue = Math.max(Number(value), 0);

    // No need to update if the value hasn’t updated.
    if (value === quantity) {
      return;
    }

    // If the field is empty, update the state but don’t do anything else.
    if (value === '') {
      setQuantity(value);
      return;
    }

    // Otherwise, trigger the loading state and set the quantity in state.
    setCartLoading(true);
    setQuantity(safeValue);

    // If the quantity is set to 0, remove the item.
    if (safeValue === 0) {
      handleRemove(event);
      return;
    }

    // If we get here, update the quantity.
    updateQuantity(safeValue);
  };

  const handleRemoveItem = event => {
    setCartLoading(true);
    handleRemove(event);
  };

  return (
    <CartListItemRoot>
      <Thumbail
        id={item.variant.image.id}
        fallback={item.variant.image.src}
        alt={item.variant.image.altText}
      />
      <Info>
        <Name>{item.title}</Name>
        <Meta>
          <span>{ item.variant.title !== 'Default Title' && item.variant.title } </span>
          <span>{ quantity + ' x ' + priceWithCommas(item.variant.price) + ' VND' }</span>
        </Meta>
        <RemoveItem onClick={handleRemoveItem}>
          <Remove icon='oi-icon-close' />
          <span>Remove</span>
        </RemoveItem>
      </Info>
      <Quantity
        aria-label="Quantity"
        id={`quantity_${item.id.substring(58, 64)}`}
        type="number"
        name="quantity"
        min="1"
        step="1"
        inputmode="numeric"
        pattern="[0-9]*"
        onChange={event => handleInputChange(event)}
        onBlur={() => setQuantity(item.quantity)}
        value={quantity}
      />
    </CartListItemRoot>
  );
};
