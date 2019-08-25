import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Footer from './Footer';
import { breakpoints, animations } from '../../utils/styles';

const PageContentRoot = styled(`main`)`
  display: flex;
  flex-direction: column;
  opacity: 1;
  padding-left: 0;
  transition: 0.75s;
  width: 100%;
  will-change: transform;

  &.covered {
    opacity: 0;
    position: fixed;
  }

  &.entry {
    animation: ${animations.deadSimpleEntry};
  }

  @media (min-width: ${breakpoints.desktop}px) {

    &.moved {
      filter: blur(1px);
      position: fixed;
      transform: translateX(-400px);
    }

    &.covered {
      display: none;
    }
  }
`;

class PageContent extends Component {
  state = {
    className: ''
  };

  componentDidUpdate(prevProps) {
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;

    if (imageBrowserStatusChanged) {
      if (this.props.productImagesBrowserStatus === 'open') {
        setTimeout(() => {
          this.setState(state => ({
            className: state.className + ' covered'
          }));
        }, 500);
      } else {
        this.setState(state => ({
          className: state.className.replace(' covered', '')
        }));
      }
    }
  }

  render() {
    const { children } = this.props;
    const { className } = this.state;

    return (
      <PageContentRoot className={className}>
        {children}
        <Footer />
      </PageContentRoot>
    );
  }
}

PageContent.propTypes = {
  cartStatus: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default PageContent;
