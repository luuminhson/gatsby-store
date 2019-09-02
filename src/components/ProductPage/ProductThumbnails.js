import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Image from 'gatsby-image';

import InterfaceContext from '../../context/InterfaceContext';

import { breakpoints, mediaQuery, colors, radius, spacing } from '../../utils/styles';
import { type } from 'os';

const THUMBNAIL_SIZE = '80px';

const ProductThumbnailsRoot = styled(`div`)`
  height: ${THUMBNAIL_SIZE};
  padding: 0 ${spacing.xs}px;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  width: 100%;

  ${mediaQuery.tabletFrom} {
    flex: 1 0 auto;
    height: auto;
    width: auto;
    max-width: calc(${THUMBNAIL_SIZE} + ${spacing.xs * 2}px);
    padding: ${spacing.xs}px 0;
    margin-right: ${spacing.md}px;
    overflow-x: hidden;
  }
`;

export const ProductThumbnailsContent = styled(`div`)`
  display: inline-flex;
  height: 100%;

  ${mediaQuery.tabletFrom} {
    flex-direction: column;
    justify-content: center;
    min-width: 100%;
  }
`;

export const Thumbnail = styled(`a`)`
  background-color: ${colors.white};
  border-radius: ${radius.default}px;
  height: ${THUMBNAIL_SIZE};
  margin: ${spacing.xs}px;
  width: ${THUMBNAIL_SIZE};
  opacity: 0.75;
  box-shadow: 0 0 0 1px ${colors.neutral2};
  transition: all 0.2s ease-in-out;

  &.active {
    opacity: 1;
    box-shadow: 0 0 0 2px ${colors.mainDark};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: pointer;
  }
`;

const active = css`
  opacity: 1;
  box-shadow: 0 0 0 2px ${colors.mainDark};
`;

class ProductThumbnails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: this.props.activeIdx,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (index, callbackIndex, image, callbackImage) => event => {
    event.preventDefault();

    callbackIndex(index);
    
    callbackImage(image);

  };

  componentDidUpdate(prevProps) {
    const activeIdxChanged = prevProps.activeIdx !== this.props.activeIdx;

    // Update state activeIndex

    activeIdxChanged && (
      this.setState({
        activeIndex: this.props.activeIdx,
      })
    );
  }

  render() {
    const { images, className } = this.props;
    const { activeIndex } = this.state;

    return (
      <InterfaceContext.Consumer>
        {({
          featureProductImage,
          featureProductImageIndex
        }) => (
          <ProductThumbnailsRoot className={className}>
            <ProductThumbnailsContent>
              {images.map((image, idx) => {
                const {
                  id,
                  localFile: {
                    childImageSharp: { fluid }
                  }
                } = image;

                return (
                  <Thumbnail
                    key={id}
                    css={idx === activeIndex && active}
                    onClick={this.handleClick(idx, featureProductImageIndex, image, featureProductImage)}
                    href={fluid.src}
                  >
                    <Image fluid={fluid} />
                  </Thumbnail>
                );
              })}
            </ProductThumbnailsContent>
          </ProductThumbnailsRoot>
        )}
      </InterfaceContext.Consumer>
    );
  }
}

ProductThumbnails.propTypes = {
  images: PropTypes.array.isRequired,
  className: PropTypes.string,
  activeIdx: PropTypes.number
};

export default ProductThumbnails;
