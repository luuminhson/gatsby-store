import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ProductImage from './ProductImage';
import ProductThumbnails, { Thumbnail } from './ProductThumbnails';

import { spacing } from '../../utils/styles';

const THUMBNAIL_SIZE = '80px';

const ProductImagesDesktopRoot = styled(`div`)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Thumbnails = styled(ProductThumbnails)`

  ${Thumbnail} {
    height: ${THUMBNAIL_SIZE};
    width: ${THUMBNAIL_SIZE};
    max-width: calc(${THUMBNAIL_SIZE} + ${spacing.xs * 2}px);
  }
`;

const MainImage = styled(ProductImage)`
  dislay: flex;
`;

const ProductImagesDesktop = ({ images, imageFeatured, imageFeaturedIndex }) => {
  const image = images[0];

  return (
    <ProductImagesDesktopRoot>
      { images.length !== 1 &&
        <Thumbnails images={images} activeIdx={imageFeaturedIndex} />
      }
      <MainImage
        image={imageFeatured ? imageFeatured : image}
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
