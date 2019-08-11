import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled, { keyframes } from 'react-emotion';
import { MdClose, MdZoomIn, MdZoomOut } from 'react-icons/md';

import ProductThumbnails, {
  ProductThumbnailsContent,
  Thumbnail
} from './ProductThumbnails';
import { Button } from '../shared/Buttons';
import { debounce } from '../../utils/helpers';

import {
  colors,
  radius,
  spacing,
  dimensions,
  mediaQuery
} from '../../utils/styles';

const IMAGE_CHANGE_ANIM_DURATION = 250;

const entry = keyframes`
  0% {
    left: 0;
    transform: scale(0.8);
  }
  100% {
    left: 0;
    transform: scale(1);
  }
`;

const exit = keyframes`
  0% {
    left: 0;
    opacity: 1;
    transform: scale(1);
  }
  99% {
    left: 0;
    opacity: 0;
    transform:  scale(0.8);
  }
  100% {
    left: 100%;
    opacity: 0;
    transform:scale(0.8);
  }
`;

const ProductImagesBrowserRoot = styled(`div`)`
  background: white;
  bottom: 0;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column-reverse;
  justify-content: stretch;
  left: 100%;
  opacity: 1;
  position: fixed;
  top: 0;
  transform: scale(0.8);
  transform-origin: center center;
  width: 100vw;
  will-change: opacity, transform, left;
  z-index: 10000;

  &.open {
    animation: ${entry} 300ms ease-out forwards;
  }

  &.closed {
    animation: ${exit} 200ms ease-out forwards;
  }

  ${mediaQuery.tabletFrom} { {
    flex-direction: row;
    height: 100vh;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: ${spacing.md}px;
  right: ${spacing.md}px;
  z-index: 1000;

  svg {
    margin: 0;
  }
`;

const change = keyframes`
  0% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
`;

const ZoomArea = styled(`div`)`
  border-bottom: 1px solid ${colors.brandLight};
  flex-grow: 1;
  flex-shrink: 0;
  height: calc(100% - ${dimensions.pictureBrowserAction.widthDesktop});
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: scroll;
  width: 100%;

  &.change {
    animation: ${change} ${IMAGE_CHANGE_ANIM_DURATION}ms ease-out forwards;
  }

  ${mediaQuery.tabletFrom} { {
    border-bottom: none;
    border-left: 1px solid ${colors.brandLight};
    display: flex;
    height: 100vh;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    width: calc(100% - ${dimensions.pictureBrowserAction.widthDesktop});
  }
`;

const ImageBox = styled(`a`)`
  display: block;
  height: 100%;
  position: relative;
  width: 100%;

  .gatsby-image-wrapper {
    height: auto;
    width: ${props => (props.superZoom ? props.width * 2 : props.width)}px;
  }

  @media (orientation: landscape) {
    .gatsby-image-wrapper {
      width: ${props => (props.superZoom ? '200' : '100')}%;
    }
  }

  ${mediaQuery.tabletFrom} { {
    cursor: ${props => (props.superZoom ? 'zoom-out' : 'zoom-in')};
    width: ${props => (props.superZoom ? '100%' : 'auto')};

    .gatsby-image-wrapper {
      width: ${props => (props.superZoom ? '100%' : '100vh')};
    }
  }
`;

const ZoomHelper = styled(`span`)`
  background: rgba(255, 255, 255, 0.5);
  border-radius: ${radius.large}px;
  display: flex;
  left: ${spacing['xs']}px;
  padding: ${spacing['xs']}px;
  position: fixed;
  top: ${spacing['xs']}px;

  svg {
    fill: ${colors.brand};
    height: 34px;
    width: 34px;
  }

  ${mediaQuery.tabletFrom} { {
    display: none;
  }
`;

const ThumbnailListWrapper = styled(`div`)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  padding: ${spacing.md}px;

  ${mediaQuery.tabletFrom} {
    align-items: center;
    flex-direction: column;
    height: 100vh;
    padding-left: 0;
    padding-top: ${spacing.xl}px;
    width: ${dimensions.pictureBrowserAction.widthDesktop};
  }
`;

const ThumbnailList = styled(ProductThumbnails)`
  margin-right: 0 !important;
  width: 100%;
  height: auto;

  ${ProductThumbnailsContent} {
    width: 100%;
    max-width: 100%;
    overflow-x: scroll;
    align-items: center;
    justify-content: center;
  }

  ${Thumbnail} {
    width: 48px;
    height: 48px;
    margin: ${spacing.xs}px;
  }

  ${mediaQuery.tabletFrom} { {
    padding: ${spacing.lg}px 0 !important;

    ${ProductThumbnailsContent} {
      align-items: center;
      flex-direction: column;
    }

    ${Thumbnail} {
      width: 64px;
      height: 64px;
      margin: ${spacing.md}px;
    }
  }
`;

class ProductImagesBrowser extends Component {
  zoomArea;
  imageBox;
  closeButton;

  state = {
    zoomAreaWidth: null,
    imageBoxHeight: null,
    superZoom: false
  };

  componentDidMount = () => {
    this.measureImage();
    this.centerImage();

    window.addEventListener('resize', debounce(250, this.measureImage));
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', debounce(250, this.measureImage));
  };

  componentDidUpdate = prevProps => {
    if (prevProps.position !== this.props.position) {
      if (this.props.position === 'open') {
        if (this.state.superZoom) {
          this.setState({
            superZoom: false
          });
        }
      }
    }

    if (
      prevProps.imageFeatured !== this.props.imageFeatured ||
      prevProps.position !== this.props.position
    ) {
      this.centerImage();

      this.zoomArea.classList.add('change');
      setTimeout(
        () => this.zoomArea.classList.remove('change'),
        IMAGE_CHANGE_ANIM_DURATION
      );
    }
  };

  measureImage = () => {
    if (this.zoomArea && this.imageBox) {
      this.setState({
        zoomAreaWidth: this.zoomArea.offsetWidth,
        imageBoxHeight: this.imageBox.offsetHeight
      });
    }
  };

  centerImage = () => {
    const offsetToScroll =
      (this.state.imageBoxHeight - this.state.zoomAreaWidth) / 2;

    this.zoomArea.scrollLeft = offsetToScroll;
  };

  close = callback => event => {
    callback();
  };

  toggleZoomRatio = event => {
    event.preventDefault();

    this.setState(state => ({ superZoom: !state.superZoom }));
  };

  render() {
    const { images, position, imageFeatured, imageFeaturedIndex, toggle } = this.props;
    const image = imageFeatured ? imageFeatured : images[0];

    const {
      altText,
      localFile: {
        childImageSharp: { fluid }
      }
    } = image;

    const { imageBoxHeight, superZoom } = this.state;

    return (
      <ProductImagesBrowserRoot role="dialog" className={position}>
        <CloseButton onClick={this.close(toggle)} ref={this.closeButton}>
          <MdClose />
        </CloseButton>

        <ThumbnailListWrapper>
          <ThumbnailList images={images} activeIdx={imageFeaturedIndex} />
        </ThumbnailListWrapper>

        <ZoomArea
          innerRef={container => {
            this.zoomArea = container;
          }}
        >
          <ImageBox
            onClick={this.toggleZoomRatio}
            href={fluid.src}
            superZoom={superZoom}
            width={imageBoxHeight}
            innerRef={image => {
              this.imageBox = image;
            }}
          >
            <Image fluid={fluid} />
            {/* {console.log(`Outside prop: ${imageFeaturedIndex}`)} */}
          </ImageBox>
        </ZoomArea>
        <ZoomHelper>{superZoom ? <MdZoomOut /> : <MdZoomIn />}</ZoomHelper>
      </ProductImagesBrowserRoot>
    );
  }
}

ProductImagesBrowser.propTypes = {
  images: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  imageFeatured: PropTypes.object,
  imageFeaturedIndex: PropTypes.number,
  isDesktopViewport: PropTypes.bool
};

export default ProductImagesBrowser;
