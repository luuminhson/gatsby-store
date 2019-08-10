import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import ProductImage from './ProductImage';
import ProductThumbnails, { Thumbnail } from './ProductThumbnails';

import { spacing, mediaQuery } from '../../utils/styles';

const THUMBNAIL_SIZE = '54px';

const ProductImagesDesktopRoot = styled(`div`)`
  margin-right: ${spacing.lg}px;
  flex: 1 0 50%;

  ${mediaQuery.tabletFrom} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Thumbnails = styled(ProductThumbnails)`
  ${Thumbnail} {
    height: ${THUMBNAIL_SIZE};
    width: ${THUMBNAIL_SIZE};
  }
`;

const ProductImagesDesktop = ({ images, imageFeatured, imageOnClick }) => {
  const image = images[0];

  return (
    <ProductImagesDesktopRoot>
      <Thumbnails images={images} />
      <ProductImage
        image={imageFeatured ? imageFeatured : image}
        onClick={imageOnClick}
      />
    </ProductImagesDesktopRoot>
  );
};

ProductImagesDesktop.propTypes = {
  images: PropTypes.array.isRequired,
  imageOnClick: PropTypes.func,
  imageFeatured: PropTypes.object
};

export default ProductImagesDesktop;
