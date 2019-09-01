import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ProductImagesMobile from './ProductImagesMobile';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductSpecs from './ProductSpecs';
import ProductForm from './ProductForm';

import InterfaceContext, { defaultInterfaceContext } from '../../context/InterfaceContext';

import { breakpoints, mediaQuery, colors, spacing, headerHeight } from '../../utils/styles';

const ProductPageRoot = styled('div')`
  padding-top: ${headerHeight.phone};
  padding-bottom: ${spacing.md}px;
  margin: 0 auto;

  ${mediaQuery.tabletFrom} {
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${colors.mainLight};
    padding: calc(${headerHeight.tablet} + ${spacing['4xl']}px) ${spacing.xl}px calc(${headerHeight.tablet});
    width: 100%;
  }

  ${mediaQuery.desktop} {
    padding-top: calc(${headerHeight.desktop} + ${spacing['4xl']}px);
  }
`;

const Container = styled(`div`)`
  ${mediaQuery.tabletFrom} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: ${breakpoints.fhd}px;
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
      <InterfaceContext.Consumer>
        {({
          featureProductImage,
          featureProductImageIndex,
          productImageFeaturedIndex,
        }) => (
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
                  imageFeaturedIndex={productImageFeaturedIndex}
                />
              )}
              <Details>
                <ProductSpecs product={product} />
                <ProductForm id={id} variants={variants} />
              </Details>
            </Container>
          </ProductPageRoot>
        )}
      </InterfaceContext.Consumer>
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
