import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { fontWeight, FontStyle, spacing, mediaQuery } from '../../utils/styles';
import { priceWithCommas } from '../../utils/helpers';

const ProductSpecsRoot = styled(`div`)`
  padding: 0 ${spacing.xl}px;

  ${mediaQuery.tabletFrom} {
    padding: 0 ${spacing.xl}px;
  }
`;

const PriceRow = styled(`div`)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    margin-top: ${spacing.lg}px;
    margin-bottom: ${spacing.xl}px;
  }
`;

const Price = styled(FontStyle.h3)`
  font-weight: ${fontWeight.heading.bold};  
  margin-right: 8px;
`;

const SalePrice = styled(FontStyle.h4)`
  text-decoration: line-through;
  font-weight: ${fontWeight.heading.normal};
  opacity: 0.5;
`;

const ProductSpecs = props => {
  const {
    product: {
      title,
      description,
      variants: [variant]
    }
  } = props;

  const { price, compareAtPrice } = variant;

  return (
    <ProductSpecsRoot>
      <FontStyle.h1>{title}</FontStyle.h1>
      <PriceRow>
        <Price>{priceWithCommas(price)} VND</Price>
        {compareAtPrice && compareAtPrice !== null &&
          <SalePrice>{priceWithCommas(compareAtPrice)} VND</SalePrice>
        }
      </PriceRow>
      <FontStyle.body>{description}</FontStyle.body>
    </ProductSpecsRoot>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductSpecs;
