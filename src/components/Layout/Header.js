import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import Logo from './Logo';
import Cart from '../Cart';
import CartToggle from '../Cart/CartToggle';

import { breakpoints, colors, dimensions, spacing } from '../../utils/styles';

const HeaderRoot = styled('header')`
  display: ${props => (props.isCovered ? 'none' : 'flex')};  
  align-items: center;
  background-color: ${colors.white};
  box-sizing: border-box;
  height: ${dimensions.headerHeightMobile};
  justify-content: space-between;
  left: 0;
  padding: 0 ${spacing.xl}px;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1000;

  @media (min-width: ${breakpoints.tablet}px) {
    height: ${dimensions.headerHeightTablet};
    padding: 0 ${spacing['4xl']}px;
    position: relative;

    &.covered {
      display: none;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    height: ${dimensions.headerHeightDesktop};
  }
`;

const HomeLink = styled(Link)`
  display: block;
  flex-shrink: 0;
  line-height: 1;
  margin-right: auto;
`;

class Header extends Component {
  state = {
    className: ''
  };

  componentDidUpdate(prevProps) {
    if (this.props.isDesktopViewport) {
      const imageBrowserStatusChanged =
        this.props.productImagesBrowserStatus !==
        prevProps.productImagesBrowserStatus;

      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === 'open') {
          setTimeout(() => {
            this.setState({
              className: 'covered'
            });
          }, 500);
        } else {
          this.setState({
            className: ''
          });
        }
      }
    }
  }

  render() {
    const {
      toggleCart,
      isDesktopViewport,
    } = this.props;
    const { className } = this.state;

    return (
      <HeaderRoot className={className}>
        <HomeLink to="/" aria-label="Home page">
          <Logo isDesktopViewport={isDesktopViewport} />
        </HomeLink>
        <CartToggle toggle={toggleCart} />
      </HeaderRoot>
    );
  }
}

Header.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool,
};

export default Header;
