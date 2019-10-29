import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ProductImagesMobile from './ProductImagesMobile';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductForm from './ProductForm';

import InterfaceContext from '../../context/InterfaceContext';
import StoreContext from '../../context/StoreContext';

import { FontStyle, fontWeight, breakpoints, mediaQuery, colors, spacing, headerHeight, dimensions } from '../../utils/styles';
import { priceWithCommas } from '../../utils/helpers';

const _ = require('lodash');

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

const ProductSpecTitle = styled(FontStyle.h1)`
  display: none;

  ${mediaQuery.tabletFrom} {
    display: block;
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
  padding: ${spacing.md}px ${spacing.xl}px 0;

  ${mediaQuery.tabletFrom} {
    flex: 1 0 50%;
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
    margin-top: ${spacing.xl}px;
  }

  ${mediaQuery.desktop} {
    margin-top: ${spacing['2xl']}px;
  }
`;

const PriceRow = styled(`div`)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    margin-top: ${spacing.lg}px;
    margin-bottom: ${spacing.xl}px;
  }
`;

const Price = styled(FontStyle.h3)`
  font-weight: ${fontWeight.heading.medium};  
  margin-right: 8px;
`;

const SalePrice = styled(FontStyle.h3)`
  text-decoration: line-through;
  font-weight: ${fontWeight.heading.normal};
  opacity: 0.5;
`;

const ProductDescription = styled(`div`)`
  margin: ${spacing.xl}px 0;
`;

class ProductPage extends Component {

  componentDidMount() {
    const images = this.props.product.images;
    const firstVariant = this.props.product.variants[0].shopifyId;

    this.props.setCurrentProductImages(images);
    this.props.setCurrentVariant(firstVariant);
  }

  render() {
    const {
      product,
      product: {
        id,
        title,
        variants,
        descriptionHtml,
        images: originalImages
      }
    } = this.props;

    const {
      viewportIs,
      productImageFeatured,
      toggleProductImagesBrowser
    } = this.props;

    const selectedVariant = (currentVariant) => (
      variants.filter(id => {
        return id.shopifyId == currentVariant;
      })
    );

    const price = (variant) => (
      selectedVariant(variant).length === 0
        ? variants[0].price
        : selectedVariant(variant)[0].price
    )

    const compareAtPrice = (variant) => (
      selectedVariant(variant).length === 0
        ? variants[0].compareAtPrice
        : selectedVariant(variant)[0].compareAtPrice
    )

    // Process the product images
    // Display the current variant image first, then all non-variant images

    const getCurrentVariantIndex = (currentVariant) => (
      _.findIndex(variants, item => (
        item.shopifyId == currentVariant
      ))
    );

    const processedImages = _.uniq(originalImages.map( i => (i)));

    const variantImages = variants.map( i => ( i.image ));

    const variantImageIds = variants.map( i => ( i.image.id ));

    const filterImages = (currentVariant) => {
      for (let i = 0; i < processedImages.length; i++ ) {
        _.remove(processedImages, item => {
          return item.id == variantImageIds[i];
        })
      }
      processedImages.splice(0, 0, variantImages[getCurrentVariantIndex(currentVariant)])
    };

    const hasVariants = variants.length > 1;

    const finalImages = hasVariants ? processedImages : originalImages;

    return (
      <InterfaceContext.Consumer>
        {({
          featureProductImage,
          featureProductImageIndex,
          productImageFeaturedIndex,
        }) => (
            <StoreContext.Consumer>
              {({
                currentVariant
              }) => (
                  <ProductPageRoot>

                    { currentVariant && currentVariant !== null && filterImages(currentVariant) }

                    <ProductTitle>{title}</ProductTitle>
                    <Container>
                      {(viewportIs !== 'desktop') && (viewportIs !== 'tablet') ? (
                        <ProductImagesMobile
                          images={finalImages[0] !== undefined ? finalImages : originalImages}
                          imageOnClick={toggleProductImagesBrowser}
                        />
                      ) : (
                          <ProductImagesDesktop
                            images={finalImages[0] !== undefined ? finalImages : originalImages}
                            imageOnClick={toggleProductImagesBrowser}
                            imageFeatured={productImageFeatured}
                            imageFeaturedIndex={productImageFeaturedIndex}
                          />
                      )}

                      <Details>
                        <ProductSpecTitle>{title}</ProductSpecTitle>
                        <PriceRow>
                          <Price>{priceWithCommas(price(currentVariant))} VND</Price>
                          {compareAtPrice(currentVariant) && compareAtPrice(currentVariant) !== null &&
                            <SalePrice>{priceWithCommas(compareAtPrice(currentVariant))} VND</SalePrice>
                          }
                        </PriceRow>
                        <ProductForm
                          id={id}
                          product={product}
                          compactVariants={false}
                          imageFeatured={currentVariant && currentVariant.image}
                          featureProductImage={featureProductImage}
                          imageFeaturedIndex={0}
                          featureProductImageIndex={featureProductImageIndex}
                        />
                        <ProductDescription dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                      </Details>
                    </Container>
                  </ProductPageRoot>
                )}
            </StoreContext.Consumer>
          )}
      </InterfaceContext.Consumer>
    );
  }
}

export default props => (
<StoreContext.Consumer>
        {({
          setCurrentVariant
        }) => {
          const { product } = props;
          return (
              <ProductPage
                {...props}
                product={product}
                setCurrentVariant={setCurrentVariant}
              />
          )
        }}
      </StoreContext.Consumer>
)

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  toggleProductImagesBrowser: PropTypes.func.isRequired,
  setCurrentProductImages: PropTypes.func.isRequired,
  productImageFeatured: PropTypes.object,
  viewportIs: PropTypes.string
};