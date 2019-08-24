import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Navigation from './Navigation';
import { Link } from 'gatsby';

import { colors, dimensions, spacing, mediaQuery } from '../../utils/styles';

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

  ${mediaQuery.tabletFrom} {
    height: ${dimensions.headerHeightTablet};
    padding: 0 ${spacing['4xl']}px;
    position: relative;

    &.covered {
      display: none;
    }
  }

  ${mediaQuery.desktop} {
    height: ${dimensions.headerHeightDesktop};
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: false,
      className: ''
    };
  }

  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
    document.body.classList.toggle('noScroll');
  };

  componentDidMount() {
    document.body.className = document.body.className.replace('noScroll', '');
  }

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
      isIndex,
      isPost,
      detailTitle,
      from,
      hasFeaturedImage
    } = this.props;
    const { className } = this.state;

    return (
      <HeaderRoot className={className}>
        <Navigation toggleCart={toggleCart} isDesktopViewport={isDesktopViewport} burgerClick={this.toggleSidebar} isIndex={isIndex} isPost={isPost} detailTitle={detailTitle} onFeaturedImage={hasFeaturedImage} from={from} />
      </HeaderRoot>
    );
  }
}

Header.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool,
};

export default Header;
