import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ScrollAnimation from '../shared/ScrollAnimation';
import { Link } from '../LinkWithPrev';
import Image from 'gatsby-image';

import UserContext from '../../context/UserContext';
import { priceWithCommas } from '../../utils/helpers';

import {
  mediaQuery,
  colors,
  FontStyle,
  fontWeight,
  radius,
  spacing,
  fontFamily
} from '../../utils/styles';

const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(Link)`
  flex-basis: 100%;
  margin: ${spacing.sm}px;
  // overflow: hidden;
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
  margin-bottom: ${spacing.sm}px;
  overflow: hidden;
  position: relative;
`;

const ProductTitle = styled(FontStyle.h4)`
  font-size: 0.9rem;

  ${mediaQuery.tabletFrom} {
    margin-top: ${spacing.sm}px;
    font-size: 1.1rem;
  }
`;

const SaleBadge = styled(`span`)`
  position: absolute;
  top: ${spacing.sm}px;
  left: ${spacing.sm}px;
  font-family: ${fontFamily.heading};
  font-weight: ${fontWeight.heading.medium};
  font-size: 0.8rem;
  color: ${colors.mainSupport};
  text-transform: uppercase;
  letter-spacing: 0.05rem;

  ${mediaQuery.tabletFrom} {
    font-size: 1rem;
    top: ${spacing.lg}px;
    left: ${spacing.lg}px;
  }
`;

const PriceRow = styled(`div`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;

  ${mediaQuery.tabletFrom} {
    margin-top: ${spacing.xs}px;
  }
`;

const Price = styled(FontStyle.headline)`
  font-size: 0.8rem;
  font-weight: ${fontWeight.heading.normal};
  color: ${colors.neutral5};
  margin-right: 8px;

  ${mediaQuery.tabletFrom} {
    font-size: 0.95rem;
  }
`;

const SalePrice = styled(FontStyle.headline)`
  text-decoration: line-through;
  font-weight: ${fontWeight.heading.normal};
  font-size: 0.8rem;
  opacity: 0.5;

  ${mediaQuery.tabletFrom} {
    font-size: 0.95rem;
  }
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
          <ProductListingItemLink to={`/products/${handle}`}>
            <ScrollAnimation>
              <Item>
                <Preview>
                  {compareAtPrice && compareAtPrice !== null &&
                    <SaleBadge>Sale</SaleBadge>
                  }
                  <Image fluid={fluid} />
                </Preview>
                <ProductTitle>{title}</ProductTitle>
                <PriceRow>
                  <Price>{priceWithCommas(price)} VND</Price>
                  {compareAtPrice && compareAtPrice !== null &&
                    <SalePrice>{priceWithCommas(compareAtPrice)} VND</SalePrice>
                  }
                </PriceRow>
              </Item>
            </ScrollAnimation>
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
