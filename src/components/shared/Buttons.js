import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '../LinkWithPrev';

import { colors, fontFamily, radius, fontWeight } from '../../utils/styles';

export const ButtonBase = styled(`button`)`
  align-items: center;
  background: ${colors.neutral1};
  opacity: ${props => (props.disabled ? '0.75' : '1')};
  border: none;
  border-radius: ${radius.large}px;
  color: ${colors.mainClickable};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  height: ${props => (props.small ? '32px' : '50px')};
  display: inline-flex;
  font-family: ${fontFamily.body};
  font-weight: ${fontWeight.heading.normal};
  font-size: 1.125rem;
  justify-content: center;
  padding: 0.85rem 1.5rem;
  padding: ${props => (props.small ? '0.25rem 0.85rem' : '0.85rem 1.5rem')};
  border-radius: 2px;
  transition: 0.2s ease-in-out;

  :focus {
    background: ${colors.neutral2};
    outline: 0;
  }

  svg {
    height: 1.1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    width: 1.1em;
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.neutral2};
    }
  }
`;

const ButtonAsExternalLink = styled(ButtonBase.withComponent(`a`))`
  display: inline-flex;
  text-decoration: none;
`;

const ButtonAsInternalLink = ButtonAsExternalLink.withComponent(
  ({ ...rest }) => <Link {...rest} />
);

export class Button extends Component {
  render() {
    const { children, to, href, ref, small, ...rest } = this.props;

    if (to) {
      return (
        <ButtonAsInternalLink
          to={to}
          small={small ? 1 : 0}
          {...rest}
        >
          {children}
        </ButtonAsInternalLink>
      );
    } else if (href) {
      return (
        <ButtonAsExternalLink
          href={href}
          small={small ? 1 : 0}
          {...rest}
        >
          {children}
        </ButtonAsExternalLink>
      );
    } else {
      return (
        <ButtonBase small={small ? 1 : 0} {...rest}>
          {children}
        </ButtonBase>
      );
    }
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  small: PropTypes.bool
};

Button.defaultProps = {
  small: false
}

export const PrimaryButton = styled(Button)`
  background: ${colors.mainClickable};
  color: ${colors.white};
  box-shadow: 0 20px 16px -16px rgba(0,0,0,0.24), 0 2px 4px rgba(0,0,0,0.12);

  :focus {
    background: ${colors.mainClickable};
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.mainClickable};
      transform: translate3d(0, 1px, 0);
      box-shadow: 0 12px 8px -8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2);
    }
  }
`;

export const FlatButton = styled(Button)`
  background-color: transparent;
`;
