import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ProductImagesMobile from './ProductImagesMobile';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductSpecs from './ProductSpecs';
import ProductForm from './ProductForm';

import InterfaceContext from '../../context/InterfaceContext';

import { FontStyle, breakpoints, mediaQuery, colors, spacing, headerHeight, dimensions } from '../../utils/styles';

const ProductPageRoot = styled('div')`
  padding-bottom: ${spacing.md}px;
  margin: -${headerHeight.tablet} auto 0;

  ${mediaQuery.tabletFrom} {
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${colors.mainLight};
    padding: calc(${headerHeight.tablet} + ${spacing['4xl']}px) ${spacing.xl}px calc(${headerHeight.tablet});
    width: 100%;
    margin-top: calc(-${headerHeight.tablet} - ${spacing['4xl']}px);
  }

  ${mediaQuery.desktop} {
    padding-top: calc(${headerHeight.desktop} + ${spacing['4xl']}px);
    margin-top: calc(-${headerHeight.desktop} - ${spacing['4xl']}px);
  }
`;

const ProductTitle = styled(FontStyle.h3)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  width: calc(100vw - ${spacing.xl * 4}px);
  margin: ${spacing.lg}px auto ${spacing.md}px;
  text-align: center;

  ${mediaQuery.tabletFrom} {
    display: none;
  }
`;

const Container = styled(`div`)`
  ${mediaQuery.tabletFrom} {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    max-width: ${breakpoints.fhd}px;
  }

  ${mediaQuery.tabletPortrait} {
    flex-direction: column;
  }
`;

const Details = styled(`div`)`
  position: relative;

  ${mediaQuery.tabletFrom} {
    flex: 1 0 50%;
    margin-top: ${spacing['4xl']}px;
  }

  ${mediaQuery.desktop} {
    margin-top: ${spacing['6xl']}px;
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
      viewportIs,
      productImageFeatured,
      toggleProductImagesBrowser
    } = this.props;

    return (
      <InterfaceContext.Consumer>
        {({
          productImageFeaturedIndex,
        }) => (
          <ProductPageRoot>
            <ProductTitle>{product.title}</ProductTitle>
            <Container>
              {( viewportIs !== 'desktop') && ( viewportIs !== 'tablet')  ? (
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
  viewportIs: PropTypes.string
};

export default ProductPage;
