import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ProductImagesMobile from './ProductImagesMobile';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductForm from './ProductForm';
import Accordion, { ModuleTitle } from '../shared/Accordion';

import InterfaceContext from '../../context/InterfaceContext';
import StoreContext from '../../context/StoreContext';

import { FontStyle, fontWeight, breakpoints, mediaQuery, colors, spacing, headerHeight, dimensions } from '../../utils/styles';
import { priceWithCommas } from '../../utils/helpers';

import CommonInfo from './CommonInformation';

const _ = require('lodash');

const ProductPageRoot = styled('div')`
  padding-bottom: ${spacing.md}px;
  margin: 0 auto ;

  ${mediaQuery.tabletFrom} {
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${colors.mainLight};
    padding: calc(${headerHeight.tablet} + ${dimensions.navPaddingTopTablet}px + ${spacing['4xl']}px) ${spacing.xl}px ${dimensions.navHeightTablet};
    width: 100%;
    margin-top: calc(-${headerHeight.tablet} - ${dimensions.navPaddingTopTablet}px - ${spacing['4xl']}px);
  }

  ${mediaQuery.desktop} {
    padding-top: calc(${headerHeight.desktop} + ${dimensions.navPaddingTopDesktop}px + ${spacing['4xl']}px);
    margin-top: calc(-${headerHeight.desktop} - ${dimensions.navPaddingTopDesktop}px - ${spacing['4xl']}px);
  }
`;

const ProductSpecTitle = styled(FontStyle.h2)`
`;

const MainContainer = styled(`div`)`
  ${mediaQuery.tabletFrom} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    max-width: ${breakpoints.hd}px;
  }

  ${mediaQuery.tabletPortrait} {
    flex-wrap: wrap;
  }
`;

const ProductImagesContainer = styled(`div`)`
  flex: 0 1 50%;
  display: flex;
  align-items: stretch;

  ${mediaQuery.tabletFrom} {
    flex: 0 1 65%;
    padding-right: ${spacing['2xl']}px;
  }

  ${mediaQuery.tabletPortrait} {
    flex: 0 1 100%;
    padding: 0;
  }

  ${mediaQuery.desktop} {
    // flex: 0 1 50%;
    padding-right: ${spacing['4xl']}px;
  }
`;

const Details = styled(`div`)`
  position: relative;
  padding: 0 ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    flex: 1 0 35%;
    padding: 0;
  }
  
  ${mediaQuery.tabletPortrait} {
    flex: 0 1 100%;
    margin-top: ${spacing['2xl']}px;
  }

  ${mediaQuery.desktop} {
    max-width: 40vw;
  }
`;

const PriceRow = styled(`div`)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${spacing.sm}px;

  ${mediaQuery.tabletFrom} {
    margin-top: ${spacing.xs}px;
    margin-bottom: ${spacing.md}px;
  }
`;

const Price = styled(FontStyle.h4)`
  font-weight: ${fontWeight.heading.medium};  
  color: ${colors.neutral5};
  letter-spacing: 0.5px;
  margin-right: 8px;
`;

const SalePrice = styled(FontStyle.h4)`
  text-decoration: line-through;
  font-weight: ${fontWeight.heading.normal};
  opacity: 0.5;
`;

const ProductDescription = styled(`div`)`
  margin: ${spacing.xl}px 0;
`;

const AccordionCss = css`
  ${ModuleTitle} {
    color: ${colors.neutral4};
    font-weight: ${fontWeight.heading.normal};
  }
`;

class ProductPage extends Component {

  componentDidMount() {
    const images = this.props.finalImages;
    const firstVariant = this.props.product.variants[0].shopifyId;

    this.props.setCurrentProductImages(images);
    this.props.setCurrentVariant(firstVariant);
  }

  render() {
    const {
      product,
      product: {
        title,
        variants,
        descriptionHtml,
        images: originalImages
      },
      viewportIs,
      productImageFeatured,
      finalImages
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
                    <MainContainer>
                      <ProductImagesContainer>
                        { viewportIs === null ? (
                          <ProductImagesMobile
                            images={finalImages[0] !== undefined ? finalImages : originalImages}
                          />
                        ) : (
                            <ProductImagesDesktop
                              images={finalImages[0] !== undefined ? finalImages : originalImages}

                              imageFeatured={productImageFeatured}
                              imageFeaturedIndex={productImageFeaturedIndex}
                            />
                        )}
                      </ProductImagesContainer>

                      <Details>
                        <ProductSpecTitle>{title}</ProductSpecTitle>
                        <PriceRow>
                          <Price>{priceWithCommas(price(currentVariant))} VND</Price>
                          {compareAtPrice(currentVariant) && compareAtPrice(currentVariant) !== null &&
                            <SalePrice>{priceWithCommas(compareAtPrice(currentVariant))} VND</SalePrice>
                          }
                        </PriceRow>
                        <ProductForm
                          // id={id}
                          product={product}
                          compactVariants={false}
                          imageFeatured={currentVariant && currentVariant.image}
                          featureProductImage={featureProductImage}
                          imageFeaturedIndex={0}
                          featureProductImageIndex={featureProductImageIndex}
                        />
                        <ProductDescription dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                        <Accordion css={AccordionCss} data={CommonInfo} />
                      </Details>
                    </MainContainer>
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
      const { product, finalImages } = props;
      return (
        <ProductPage
          {...props}
          product={product}
          finalImages={finalImages}
          setCurrentVariant={setCurrentVariant}
        />
      )
    }}
  </StoreContext.Consumer>
)

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  setCurrentProductImages: PropTypes.func.isRequired,
  productImageFeatured: PropTypes.object,
  viewportIs: PropTypes.string
};