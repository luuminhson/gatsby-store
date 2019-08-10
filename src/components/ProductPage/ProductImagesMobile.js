import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import ProductImage, { StyledImage } from './ProductImage';

import {
  breakpoints,
  colors,
  fontFamily,
  radius,
  spacing
} from '../../utils/styles';

const ProductImagesMobileRoot = styled(`div`)`
  width: 100vw;
  height: 80vw;
  overflow: hidden;

  &.single {
    height: calc(100vw - ${spacing.lg}px);
  }

  @media (min-width: ${breakpoints.tablet}px) {
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
  padding: 0 ${spacing.md}px;
  position: relative;

  ${StyledImage} {
    width: 100%;

    @media (min-width: ${breakpoints.tablet}px) {
      margin-right: ${spacing.xl}px;
    }
  }
`;

const ProductImagesMobile = ({ images, imageOnClick }) => (
  <ProductImagesMobileRoot className={ images.length === 1 ? 'single' : null }>
    <ProductImagesMobileContent>
      {images.map((image, idx) => (
        <ProductImage single={ images.length === 1 ? true : false } key={idx} image={image} onClick={imageOnClick} />
      ))}
    </ProductImagesMobileContent>
  </ProductImagesMobileRoot>
);

ProductImagesMobile.propTypes = {
  images: PropTypes.array.isRequired,
  imageOnClick: PropTypes.func
};

export default ProductImagesMobile;
