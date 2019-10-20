import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors, radius, spacing, dimensions, mediaQuery } from '../../utils/styles';
import OiIcon from '../OiIcon';

const CartIndicatorRoot = styled(`div`)`
  background: ${colors.white};
  color: ${colors.mainDark};
  display: flex;
  padding: ${spacing.lg}px;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  opacity: 0;
  will-change: transform;
  transform: translate3d(0, -100%, 0);
  z-index: -1;
  box-shadow: 0 0 32px 0 rgba(0,0,0,0.12);
  transition: all 0.3s ease-in-out;

  ${mediaQuery.tabletFrom} {
    width: auto;
    border-radius: ${radius.large}px;
    transform: translate3d(0, -50%, 0);
    top: calc(${dimensions.navHeightTablet} + 20px);
    right: ${spacing.lg}px;
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
          message: 'Đang cập nhật giỏ hàng...'
        });
      } else {
        if (this.props.itemsInCart > prevProps.itemsInCart) {
          
          const num = this.props.itemsInCart - prevProps.itemsInCart;

          const message = (
            <>
              <CheckIcon icon='oi-icon-check' />
              <span>{num} sản phẩm đã được thêm vào giỏ hàng.</span>
            </>
          );

          this.setState({ message });

          setTimeout(
            () => this.setState({ visible: false }),
            4000
          );
          setTimeout(
            () => this.setState({ message: '' }),
            4500
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
