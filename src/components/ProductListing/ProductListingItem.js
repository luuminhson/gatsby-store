import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import UserContext from '../../context/UserContext';
import { priceWithCommas } from '../../utils/helpers';

import {
  breakpoints,
  colors,
  FontStyle,
  fontFamily,
  fontWeight,
  radius,
  spacing
} from '../../utils/styles';

const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(Link)`
  border-radius: ${radius.large}px;
  margin: ${spacing.lg}px;
  overflow: hidden;
  text-decoration: none;
  box-sizing: border-box;
  transition: all ${TRANSITION_DURATION};

  @media (min-width: ${breakpoints.tablet}px) {
    flex-basis: calc(50% - 48px);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    flex-basis: calc(33.3333% - 48px);
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

  .gatsby-image-wrapper {
    transition: all ${TRANSITION_DURATION};
  }

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
`;

const PriceRow = styled(`div`)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: ${spacing.xs}px;
`;

const Price = styled(FontStyle.h4)`
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
                <Image fluid={fluid} />
              </Preview>
              <FontStyle.h3>{title}</FontStyle.h3>
              <PriceRow>
                <Price>{priceWithCommas(price)} VND</Price>
                {compareAtPrice &&
                  <SalePrice>{priceWithCommas(compareAtPrice)} VND</SalePrice>
                }
                {console.log(FontStyle)}
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
