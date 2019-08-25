import React from 'react';
import styled from '@emotion/styled';
import CartListItem from './CartListItem';

import { colors, spacing } from '../../utils/styles';

const CartListRoot = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CartList = ({
  items,
  handleRemove,
  updateQuantity,
  setCartLoading,
  isCartLoading
}) => (
  <CartListRoot>
    {items.map(item => (
      <CartListItem
        key={item.id}
        item={item}
        handleRemove={handleRemove(item.id)}
        updateQuantity={updateQuantity(item.id)}
        setCartLoading={setCartLoading}
        isCartLoading={isCartLoading}
      />
    ))}
  </CartListRoot>
);

export default CartList;
