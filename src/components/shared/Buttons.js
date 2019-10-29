import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from '../LinkWithPrev';

import { colors, fontFamily, radius, fontWeight } from '../../utils/styles';

export const ButtonBase = styled(`button`)`
  align-items: center;
  background: ${props => (props.inverse ? colors.mainClickable : colors.neutral1)};
  opacity: ${props => (props.disabled ? '0.75' : '1')};
  border: none;
  border-radius: ${radius.large}px;
  color: ${props => (props.inverse ? colors.brandLight : colors.mainClickable)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  height: 50px;
  display: inline-flex;
  font-family: ${fontFamily.heading};
  font-weight: ${fontWeight.heading.bold};
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  justify-content: center;
  padding: 0.85rem 1.25rem;
  transition: 0.2s ease-in-out;

  :focus {
    background: ${colors.neutral2};
    outline: 0;
  }

  svg {
    height: 1.1em;
    margin-left: ${props => (props.iconOnLeft ? 0 : '0.5em')};
    margin-right: ${props => (props.iconOnLeft ? '0.5em' : 0)};
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
  ({ iconOnLeft, inverse, ...rest }) => <Link {...rest} />
);

export class Button extends Component {
  render() {
    const { children, to, href, ref, inverse = false, ...rest } = this.props;

    // automtic recognition of icon placement, works properly only for [text + <Icon>] childrens
    const iconOnLeft = typeof children[0] !== 'string';

    if (to) {
      return (
        <ButtonAsInternalLink
          to={to}
          iconOnLeft={iconOnLeft}
          inverse={inverse}
          {...rest}
        >
          {children}
        </ButtonAsInternalLink>
      );
    } else if (href) {
      return (
        <ButtonAsExternalLink
          href={href}
          inverse={inverse}
          iconOnLeft={iconOnLeft}
          {...rest}
        >
          {children}
        </ButtonAsExternalLink>
      );
    } else {
      return (
        <ButtonBase inverse={inverse} iconOnLeft={iconOnLeft} {...rest}>
          {children}
        </ButtonBase>
      );
    }
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  inverse: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string
};

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
