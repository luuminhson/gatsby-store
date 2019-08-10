import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled, { keyframes } from 'react-emotion';

import { breakpoints, colors, radius, spacing, mediaQuery } from '../../utils/styles';

export const IMAGE_CHANGE_ANIM_DURATION = 250;

const change = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ProductImageLink = styled(`a`)`
  flex: 1 0 100%;
  display: inline-block;
  position: relative;
  scroll-snap-align: center;
  width: 100%;
  max-width: 80vw;
  box-sizing: border-box;
  padding: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;

  &:last-child {
    max-width: calc(80vw + ${spacing.md}px);
    padding-right: ${spacing.xl}px;
  }

  &.single,
  &.single:last-child {
    max-width: calc(100vw - ${spacing.lg}px);
    padding-right: ${spacing.md}px;
  }

  &.change {
    animation: ${change} ${IMAGE_CHANGE_ANIM_DURATION}ms ease-out forwards;
  }

  ${mediaQuery.tabletFrom} {
    width: auto;
    cursor: zoom-in;
    flex: 1 0 auto;
    margin-bottom: 0;
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
  imageLink;

  componentDidUpdate = prevProps => {
    if (prevProps.image.id !== this.props.image.id) {
      this.imageLink.classList.add('change');

      setTimeout(
        () => this.imageLink.classList.remove('change'),
        IMAGE_CHANGE_ANIM_DURATION
      );
    }
  };

  handleClick = callback => event => {
    event.preventDefault();

    callback(this.props.image);
  };

  render() {
    const {
      image: {
        localFile: {
          childImageSharp: { fluid }
        }
      },
      onClick,
      imageFeatured = null,
      single
    } = this.props;

    return (
      <ProductImageLink
        innerRef={el => {
          this.imageLink = el;
        }}
        href={fluid.src}
        onClick={this.handleClick(onClick)}
        className={ single ? 'single' : null }
      >
        <StyledImage fluid={imageFeatured ? featuredFluid : fluid} alt="" />
      </ProductImageLink>
    );
  }
}

ProductImage.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  imageFeatured: PropTypes.object,
  single: PropTypes.bool
};

export default ProductImage;
