import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { MdClose, MdShortText } from 'react-icons/md';

import {
  breakpoints,
  dimensions,
  colors,
  radius,
  spacing,
  mediaQuery
} from '../../utils/styles';

const ImageCaptionRoot = styled(`div`)`
  bottom: calc(
    ${dimensions.pictureBrowserAction.heightMobile} + ${spacing.xl}px
  );
  color: ${colors.white};
  cursor: default;
  position: fixed;
  left: ${spacing.md}px;
  right: ${spacing.md}px;
  width: calc(100% - ${spacing.md *2}px);
  background: rgba(0, 0, 0, 0.7);
  border-radius: ${radius.large}px;
  display: ${props => (props.superZoom ? 'none' : 'flex')};
  justify-content: space-between;
  align-items: center;

  &.hidden {
    display: none;
  }

  ${mediaQuery.tabletFrom} {
    bottom: ${spacing.lg}px;
    left: calc(50% + (${dimensions.pictureBrowserAction.widthDesktop} / 2));
    max-width: 500px;
    right: auto;
    transform: translateX(-50%);
  }
`;

const Caption = styled(`div`)`
  flex: 1 0 auto;
  font-size: 1.1rem;
  padding: 0 ${spacing.sm}px;
  padding-right: calc(${spacing.sm}px + 40px);

  p {
    margin: 0;
  }
`;

const CaptionAction = styled(`button`)`
  flex: 1 0 40px;
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: ${radius.large}px;
  cursor: pointer;
  display: inline-flex;
  width: 40px;
  height: 40px;
  max-width: 40px;
  justify-content: center;
  outline: none;

  &.hidden {
    display: none;
  }

  svg {
    color: ${colors.white};
    height: 24px;
    width: 24px;
  }
`;

class ImageCaption extends Component {
  state = {
    hidden: false,
  };

  hideCaption = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      hidden: true,
    });

  };

  render() {
    const { caption, superZoom } = this.props;
    const { hidden } = this.state;

    return (
      <ImageCaptionRoot
        superZoom={superZoom}
        className={ hidden && !superZoom ? 'hidden' : ''}
      >
        <Caption className={ hidden ? 'hidden' : ''}><p dangerouslySetInnerHTML={{ __html: caption }} /></Caption>
        <CaptionAction onClick={this.hideCaption} className={ hidden ? 'hidden' : ''}>
           <MdClose />
        </CaptionAction>
      </ImageCaptionRoot>
    );
  }
}

ImageCaption.propTypes = {
  caption: PropTypes.string.isRequired,
  superZoom: PropTypes.bool.isRequired
};

export default ImageCaption;
