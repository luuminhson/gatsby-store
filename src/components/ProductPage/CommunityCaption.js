import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { MdClose, MdKeyboardArrowUp } from 'react-icons/md';

import {
  breakpoints,
  dimensions,
  colors,
  radius,
  spacing
} from '../../utils/styles';

const CommunityCaptionRoot = styled(`div`)`
  bottom: ${spacing.xl}px;
  bottom: calc(
    ${dimensions.pictureBrowserAction.heightMobile} + ${spacing.md}px
  );
  color: ${colors.white};
  cursor: default;
  display: ${props => (props.superZoom ? 'none' : 'block')};
  left: ${spacing.md}px;
  position: fixed;
  right: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    bottom: ${spacing.lg}px;
    left: calc(50% + (${dimensions.pictureBrowserAction.widthDesktop} / 2));
    max-width: 500px;
    right: auto;
    transform: translateX(-50%);
  }
`;

const Toggle = styled(`button`)`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: ${radius.large}px;
  cursor: pointer;
  display: flex;
  height: 46px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 46px;

  svg {
    color: ${colors.white};
    height: 36px;
    width: 36px;
  }
`;

const Caption = styled(`div`)`
  background: rgba(0, 0, 0, 0.7);
  border-radius: ${radius.large}px;
  font-size: 1.1rem;
  padding: ${spacing.sm}px ${spacing.lg}px;
  padding-right: calc(${spacing.lg}px + 46px);
  width: 100%;

  p {
    margin: 0;
  }

  .minimized & {
    border-radius: ${radius.large}px;
  }
`;

class CommunityCaption extends Component {
  state = {
    minimized: false,
    incentiveExpanded: false
  };

  toggle = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState(state => ({
      minimized: !state.minimized,
      hintExpanded: false
    }));
  };

  toggleIncentive = e => {
    if (!e.target.href) {
      e.preventDefault();
      e.stopPropagation();

      this.setState(state => ({ hintExpanded: !state.hintExpanded }));
    }
  };

  render() {
    const { caption, superZoom } = this.props;
    const { minimized, hintExpanded } = this.state;

    return (
      <CommunityCaptionRoot
        superZoom={superZoom}
        className={minimized ? 'minimized' : ''}
      >
        <Caption>
          {minimized ? (
            <p>Show caption</p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: caption }} />
          )}
        </Caption>
        <Toggle onClick={this.toggle}>
          {minimized ? <MdKeyboardArrowUp /> : <MdClose />}
        </Toggle>
      </CommunityCaptionRoot>
    );
  }
}

CommunityCaption.propTypes = {
  caption: PropTypes.string.isRequired,
  superZoom: PropTypes.bool.isRequired
};

export default CommunityCaption;
