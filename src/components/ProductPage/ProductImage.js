import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import InterfaceContext from '../../context/InterfaceContext';

import { colors, radius, spacing, mediaQuery } from '../../utils/styles';

export const IMAGE_CHANGE_ANIM_DURATION = 250;

const change = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const imageItemWidth = '80vw';

// 'overflow: hidden' is important to not having the snap flickering

const ProductImageInner = styled(`div`)`
  overflow: hidden;
  width: calc(${imageItemWidth} - ${spacing.sm * 2}px);
  height: calc(${imageItemWidth} - ${spacing.sm * 2}px);
`;

const ProductImageWrapper = styled(`div`)`
  flex: 1 0 100%;
  max-width: ${imageItemWidth};
  scroll-snap-align: center;
  position: relative;
  padding: ${spacing.sm}px;
  margin-bottom: ${spacing.lg}px;

  &:last-child {
    max-width: calc(${imageItemWidth} + ${spacing.md}px);
    padding-right: ${spacing.xl}px;
  }

  &.single,
  &.single:last-child {
    max-width: calc(100vw - ${spacing.lg}px);
    padding-right: ${spacing.md}px;

    ${ProductImageInner} {
      width: 100%;
      height: 100%;
    }

    ${mediaQuery.tabletFrom} {
      max-width: 800px;
    }
  }

  ${mediaQuery.tabletFrom} {
    flex: 1 0 auto;
    padding: 0;
    margin-bottom: 0;
    max-width: 70vw;

    &:last-child {
      max-width: 70vw;
      padding: 0;
    }

    ${ProductImageInner} {
      width: auto;
      height: auto;
    }
  }

  ${mediaQuery.desktop} {
    max-width: 600px;

    &:last-child {
      max-width: 600px;
    }
  }
`;

export const StyledImage = styled(Image)`
  background-color: ${colors.mainLight};
  border-radius: ${radius.large}px;

  img {
    display: block;
  }
`;

class ProductImage extends Component {

  render() {
    const {
      image: {
        localFile: {
          childImageSharp: { fluid }
        }
      },
      single,
      ...props
    } = this.props;

    return (
      <ProductImageWrapper className={single ? 'single' : null} {...props}>
        <ProductImageInner>
          <StyledImage fluid={fluid} alt="" />
        </ProductImageInner>
      </ProductImageWrapper>
    );
  }
}

ProductImage.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  idx: PropTypes.number,
  single: PropTypes.bool
};

export default ProductImage;
