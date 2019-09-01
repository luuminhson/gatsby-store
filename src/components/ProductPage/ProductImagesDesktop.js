import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ProductImage from './ProductImage';
import ProductThumbnails, { Thumbnail } from './ProductThumbnails';

import { spacing } from '../../utils/styles';

const THUMBNAIL_SIZE = '80px';

const ProductImagesDesktopRoot = styled(`div`)`
  margin-right: ${spacing.lg}px;
  flex: 1 0 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Thumbnails = styled(ProductThumbnails)`
  ${Thumbnail} {
    height: ${THUMBNAIL_SIZE};
    width: ${THUMBNAIL_SIZE};
    max-width: calc(${THUMBNAIL_SIZE} + ${spacing.xs * 2}px);
  }
`;

const ProductImagesDesktop = ({ images, imageFeatured, imageOnClick, imageFeaturedIndex }) => {
  const image = images[0];

  return (
    <ProductImagesDesktopRoot>
      { images.length !== 1 && <Thumbnails images={images} activeIdx={imageFeaturedIndex} /> }
      <ProductImage
        image={imageFeatured ? imageFeatured : image}
        onClick={imageOnClick}
        idx={imageFeaturedIndex}
        single={ images.length === 1 ? true : false }
      />
    </ProductImagesDesktopRoot>
  );
};

ProductImagesDesktop.propTypes = {
  images: PropTypes.array.isRequired,
  imageOnClick: PropTypes.func,
  imageFeatured: PropTypes.object,
  imageFeaturedIndex: PropTypes.number,
};

export default ProductImagesDesktop;
