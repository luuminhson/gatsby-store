import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ProductImage, { StyledImage } from './ProductImage';

import { spacing, mediaQuery
} from '../../utils/styles';

const ProductImagesMobileRoot = styled(`div`)`
  width: 100vw;
  height: 80vw;
  overflow: hidden;

  &.single {
    height: calc(100vw - ${spacing.lg}px);
  }

  ${mediaQuery.tabletFrom} {
    padding: ${spacing.xl}px;
    padding-bottom: ${spacing.lg}px;
  }
`;

const ProductImagesMobileContent = styled(`div`)`
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding: 0 ${spacing.sm}px;
  transform: translateZ(0);

  ${StyledImage} {
    width: 100%;

    ${mediaQuery.tabletFrom} {
      margin-right: ${spacing.xl}px;
    }
  }
`;

const ProductImagesMobile = ({ images }) => (
  <ProductImagesMobileRoot className={ images.length === 1 ? 'single' : null }>
    <ProductImagesMobileContent>
      {images.map((image, idx) => (
        <ProductImage single={ images.length === 1 ? true : false } idx={idx} key={idx} image={image} />
      ))}
    </ProductImagesMobileContent>
  </ProductImagesMobileRoot>
);

ProductImagesMobile.propTypes = {
  images: PropTypes.array.isRequired,
  imageOnClick: PropTypes.func
};

export default ProductImagesMobile;
