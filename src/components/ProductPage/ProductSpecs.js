import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { fontWeight, FontStyle, spacing, mediaQuery } from '../../utils/styles';
import { priceWithCommas } from '../../utils/helpers';

import StoreContext from '../../context/StoreContext';

const ProductSpecsRoot = styled(`div`)`
  padding: 0 ${spacing.xl}px;

  ${mediaQuery.tabletFrom} {
    padding: 0 ${spacing.xl}px;
  }
`;

const ProductTitle = styled(FontStyle.h1)`
  display: none;

  ${mediaQuery.tabletFrom} {
    display: block;
  }
`;

const PriceRow = styled(`div`)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    margin-top: ${spacing.lg}px;
    margin-bottom: ${spacing.xl}px;
  }
`;

const Price = styled(FontStyle.h4)`
  font-weight: ${fontWeight.heading.medium};  
  margin-right: 8px;
`;

const SalePrice = styled(FontStyle.h4)`
  text-decoration: line-through;
  font-weight: ${fontWeight.heading.normal};
  opacity: 0.5;
`;

const ProductDescription = styled(`div`)``;

const ProductSpecs = props => {
  const {
    product: {
      title,
      descriptionHtml,
      variants
    }
  } = props;

  const variantsFiltered = ( currentVariant ) => (
    variants.filter( id => {
      return id.shopifyId == currentVariant;
    })
  );

  const selectedVariant = ( variant ) => ( variantsFiltered(variant).map( i => (i)) );

  const price = (variant) => (
    selectedVariant(variant).length === 0
    ? variants[0].price
    : selectedVariant(variant)[0].price
  )

  const compareAtPrice = (variant) => (
    selectedVariant(variant).length === 0
    ? variants[0].compareAtPrice
    : selectedVariant(variant)[0].compareAtPrice
  )

  return (
    <StoreContext.Consumer>
        {({
          currentVariant
        }) => (
    <ProductSpecsRoot>
      <ProductTitle>{title}</ProductTitle>
      <PriceRow>
        <Price>{priceWithCommas(price(currentVariant))} VND</Price>
        {compareAtPrice(currentVariant) && compareAtPrice(currentVariant) !== null &&
          <SalePrice>{priceWithCommas(compareAtPrice(currentVariant))} VND</SalePrice>
        }
      </PriceRow>
      <ProductDescription dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
    </ProductSpecsRoot>
    )}
    </StoreContext.Consumer>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductSpecs;
