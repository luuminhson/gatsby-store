import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import { breakpoints } from '../../utils/styles';

const pageTransition = keyframes`
  from {
    opacity: .8;
    // transform: translate3d(0, 4px, 0);
  }
`;

const startFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
      opacity: 0;
      transform: translateY(20px);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
`;

const PageContentRoot = styled(`main`)`
  display: flex;
  flex-direction: column;
  opacity: 1;
  padding-left: 0;
  transition: 0.75s;
  width: 100%;
  animation: ${startFade} 1.5s ease forwards;

  .covered {
    opacity: 0;
    position: fixed;
  }

  .entry {
    animation: ${pageTransition} .5s ease forwards;
  }

  @media (min-width: ${breakpoints.desktop}px) {

    .moved {
      filter: blur(1px);
      position: fixed;
      transform: translateX(-400px);
    }

    .covered {
      display: none;
    }
  }
`;

const PageContentInner = styled(`div`)`
  display: block;
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

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState(state => ({ className: state.className + 'entry ' }));

      setTimeout(() => {
        this.setState(state => ({
          className: state.className.replace('entry ', '')
        }));
      }, 500);
    }
  }

  render() {
    const { children } = this.props;
    const { className } = this.state;

    return (
      <PageContentRoot>
        <PageContentInner className={className}>
          {children}
        </PageContentInner>
      </PageContentRoot>
    );
  }
}

PageContent.propTypes = {
  cartStatus: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  viewportIs: PropTypes.string
};

export default PageContent;
