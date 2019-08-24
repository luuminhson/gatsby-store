import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ProductImagesMobile from './ProductImagesMobile';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductSpecs from './ProductSpecs';
import ProductForm from './ProductForm';

import { breakpoints, mediaQuery, colors, spacing, headerHeight } from '../../utils/styles';

const ProductPageRoot = styled('div')`
  padding-bottom: ${spacing.md}px;
  margin: 0 auto;

  ${mediaQuery.tabletFrom} {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - ${headerHeight.tablet});
    background-color: ${colors.mainLight};
    padding: ${spacing.xl}px;
    width: 100%;
    max-width: ${breakpoints.fhd}px;
  }

  ${mediaQuery.desktop} {
    min-height: calc(100vh - ${headerHeight.desktop});
  }
`;

const Container = styled(`div`)`
  ${mediaQuery.tabletFrom} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const Details = styled(`div`)`
  position: relative;

  ${mediaQuery.tabletFrom} {
    flex: 1 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

class ProductPage extends Component {
  componentDidMount() {
    const images = this.props.product.images;
    this.props.setCurrentProductImages(images);
  }

  render() {
    const {
      product,
      product: { id, images, variants }
    } = this.props;

    const {
      isDesktopViewport,
      productImageFeatured,
      toggleProductImagesBrowser
    } = this.props;

    return (
      <ProductPageRoot>
        <Container>
          {!isDesktopViewport ? (
            <ProductImagesMobile
              images={images}
              imageOnClick={toggleProductImagesBrowser}
            />
          ) : (
            <ProductImagesDesktop
              images={images}
              imageOnClick={toggleProductImagesBrowser}
              imageFeatured={productImageFeatured}
            />
          )}
          <Details>
            <ProductSpecs product={product} />
            <ProductForm id={id} variants={variants} />
          </Details>
        </Container>
      </ProductPageRoot>
    );
  }
}

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  toggleProductImagesBrowser: PropTypes.func.isRequired,
  setCurrentProductImages: PropTypes.func.isRequired,
  productImageFeatured: PropTypes.object,
  isDesktopViewport: PropTypes.bool
};

export default ProductPage;
