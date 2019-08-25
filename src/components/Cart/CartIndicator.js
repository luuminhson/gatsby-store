import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors, radius, spacing, dimensions, mediaQuery } from '../../utils/styles';
import OiIcon from '../OiIcon';

const CartIndicatorRoot = styled(`div`)`
  background: ${colors.white};
  border-radius: ${radius.large}px;
  color: ${colors.mainDark};
  display: flex;
  justify-content: center;
  padding: ${spacing.lg}px;
  position: fixed;
  top: calc(${dimensions.navHeightMobile} + 8px);
  right: 24px;
  opacity: 0;
  will-change: transform;
  transform: translate3d(0, 10%, 0);
  z-index: -1;
  box-shadow: 0 0 32px 0 rgba(0,0,0,0.12);
  transition: all 0.3s ease-in-out;

  ${mediaQuery.tabletFrom} {
    top: calc(${dimensions.navHeightTablet} + 20px);
  }

  ${mediaQuery.desktop} {
    top: calc(${dimensions.navHeightDesktop} + 20px);
  }
`;

const On = css`
  opacity: 1;
  transform: translate3d(0, 0, 0);
  z-index: 4000;
`;

const CheckIcon = styled(OiIcon)`
  color: ${colors.mainSupport};
  margin-right: 16px;
`;

class CartIndicator extends Component {
  state = {
    visible: false,
    message: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.adding !== this.props.adding) {
      if (this.props.adding) {
        this.setState({
          visible: true,
          message: 'Updating cart...'
        });
      } else {
        if (this.props.itemsInCart > prevProps.itemsInCart) {
          
          const num = this.props.itemsInCart - prevProps.itemsInCart;

          const message = (
            <>
              <CheckIcon icon='oi-icon-check' />
              <span>{num} new item{ num > 1 ? 's' : ''} { num > 1 ? 'have' : 'has'} been added to the cart</span>
            </>
          );

          this.setState({ message });

          setTimeout(
            () => this.setState({ visible: false }),
            3000
          );
          setTimeout(
            () => this.setState({ message: '' }),
            3500
          );
        }
      }
    }
  }

  render() {
    const { visible, message } = this.state;

    return <CartIndicatorRoot css={visible && On}>{message}</CartIndicatorRoot>;
  }
}

CartIndicator.propTypes = {
  itemsInCart: PropTypes.number.isRequired,
  adding: PropTypes.bool.isRequired
};

export default CartIndicator;
