import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import UserContext from '../../context/UserContext';
import { priceWithCommas } from '../../utils/helpers';

import {
  mediaQuery,
  colors,
  FontStyle,
  fontWeight,
  radius,
  spacing
} from '../../utils/styles';

const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(Link)`
  flex-basis: 100%;
  margin: ${spacing.sm}px;
  overflow: hidden;
  text-decoration: none;
  box-sizing: border-box;
  transition: all ${TRANSITION_DURATION};

  ${mediaQuery.phone} {
    flex-basis: calc(50% - ${spacing.sm * 2}px);
  }

  ${mediaQuery.tablet} {
    flex-basis: calc(50% - ${spacing.lg * 2}px);
    margin: ${spacing.lg}px;
  }

  ${mediaQuery.desktop} {
    flex-basis: calc(33.3333% - ${spacing.xl * 2}px);
    margin: ${spacing.xl}px;
  }
`;

const Item = styled(`article`)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Preview = styled(`div`)`
  background: ${colors.mainLight};
  border-radius: ${radius.large}px;
  margin-bottom: ${spacing.md}px;
  overflow: hidden;
  position: relative;
`;

const SaleBadge = styled(`span`)`
  position: absolute;
  top: ${spacing.sm}px;
  left: ${spacing.sm}px;
  font-weight: ${fontWeight.body.medium};
  color: ${colors.mainSupport};
  text-transform: uppercase;
  letter-spacing: 0.05rem;

  ${mediaQuery.tabletFrom} {
    font-size: 1.125rem;
    top: ${spacing.lg}px;
    left: ${spacing.lg}px;
  }
`;

const PriceRow = styled(`div`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: ${spacing['2xs']}px;

  ${mediaQuery.tabletFrom} {
    margin-top: ${spacing.xs}px;
  }
`;

const Price = styled(FontStyle.headline)`
  font-weight: ${fontWeight.heading.normal};  
  margin-right: 8px;
`;

const SalePrice = styled(FontStyle.headline)`
  text-decoration: line-through;
  font-weight: ${fontWeight.heading.normal};
  opacity: 0.5;
`;

const ProductListingItem = props => {
  const {
    product: {
      title,
      handle,
      variants: [firstVariant],
      images: [firstImage]
    }
  } = props;

  const { price, compareAtPrice } = firstVariant;
  const {
    localFile: {
      childImageSharp: { fluid }
    }
  } = firstImage;

  return (
    <UserContext.Consumer>
      {() => {
        return (
          <ProductListingItemLink to={`/product/${handle}`}>
            <Item>
              <Preview>
                { compareAtPrice && compareAtPrice !== null &&
                  <SaleBadge>Sale</SaleBadge>
                }
                <Image fluid={fluid} />
              </Preview>
              <FontStyle.h4>{title}</FontStyle.h4>
              <PriceRow>
                <Price>{priceWithCommas(price)} VND</Price>
                {compareAtPrice && compareAtPrice !== null &&
                  <SalePrice>{priceWithCommas(compareAtPrice)} VND</SalePrice>
                }
              </PriceRow>
            </Item>
          </ProductListingItemLink>
        );
      }}
    </UserContext.Consumer>
  );
};

ProductListingItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductListingItem;
