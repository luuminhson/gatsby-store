// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import { Link } from '../../LinkWithPrev';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Headroom from 'react-headroom';
import Logo from './Logo';
import Menu from './Menu';
import OiIcon from '../../OiIcon';
import CartToggle from '../../Cart/CartToggle';
import { FontStyle, fontFamily, dimensions, mediaQuery, spacing, colors, breakpoints, shadow } from '../../../utils/styles';

const NavigationWrapper = styled(`div`)`
    background-color: ${colors.white};
    width: 100%;
    padding: 0 ${spacing.lg}px;
    position: relative;
    box-shadow: ${shadow.navShadow};
    transition: all 0.3s ease-in-out;
    z-index: 2000;

    ${mediaQuery.tabletFrom} {
        padding: 0 ${spacing.xl}px;
    }

    ${mediaQuery.desktop} {
        padding: 0 ${spacing['4xl']}px;
    }
`;

const NavigationInner = styled(`div`)`
    position: relative;
    height: ${dimensions.navHeightMobile};
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin: 0 auto;
    // max-width: ${breakpoints.fhd}px;
    transition: height 0.2s ease-in-out;

    ${mediaQuery.tabletFrom} {
        height: ${dimensions.navHeightTablet};
    }
`;

const isIndexStyle = css``;

const isPostStyle = css`
    background-color: transparent;
`;

const isStoreStyle = css``;

const isProductStyle = css`
    background-color: transparent;
`;

const BackButton = styled(Link)`
    font-family: ${fontFamily.heading};
    width: 60px;
    height: ${dimensions.navHeightMobile};
    line-height: ${dimensions.navHeightMobile};
    font-size: 1.75rem;
    font-weight: 400;
    color: ${colors.mainDark};
    padding-left: 12px;
    margin-left: -0.75rem;
    box-sizing: border-box;

    span {
        display: none;
    }

    ${mediaQuery.tabletFrom} {
        width: auto;
        display: flex;
        align-items: center;

        span {
            font-size: 1rem;
            display: inline-block;
            margin-left: ${spacing.sm}px;
        }
    }
`;

const DetailTitle = styled(FontStyle.h1)`
    display: inline-block;
    font-size: 0.85rem;
    line-height: ${dimensions.navHeightMobile};
    color: ${colors.mainDark};
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0 12px;

    ${mediaQuery.tabletFrom} {
        line-height: ${dimensions.navHeightTablet};
        font-size: 1.1rem;
    }

    ${mediaQuery.desktop} {
        line-height: ${dimensions.navHeightDesktop};
    }
`;

const NavLeftWrapper = styled(`div`)`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

const NavCenterWrapper = styled(`div`)`
    max-width: 56%;
    display: flex;
    align-items: center;
    position: relative;

    ${mediaQuery.tabletFrom} {
        max-width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const NavRightWrapper = styled(`div`)`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

const CartToggleIcon = styled(CartToggle)`
    display: flex;
`;

const BurgerIcon = styled(`div`)`
  position: relative;
  width: 60px;
  height: ${dimensions.navHeightMobile};
  margin-right: -8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQuery.tabletFrom} {
    margin-right: -12px;
  }
`;

const MainMenu = styled(Menu)`
    ${mediaQuery.tabletFrom} {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const HeadroomWrapper = styled(Headroom)`
    width: 100%;
    position: relative;
    z-index: 100;
`;

const unpinnedStyle = css``;

const pinnedStyle = css`
    ${NavigationWrapper} {
        background-color: ${colors.white};

        ${BackButton} {
            color: ${colors.mainDark};

            i {
                color: ${colors.mainDark};
            }
        }

        ${DetailTitle} {
            color: ${colors.mainDark};
            transition: color 0.4s ease-in-out;
        }

        ${CartToggleIcon},
        ${BurgerIcon} {
            i {
                color: ${colors.mainDark};
                transition: color 0.4s ease-in-out;
            }
        }
    }
`;

const unfixedStyle = css`
    ${NavigationWrapper} {
        box-shadow: none;

        ${DetailTitle} {
            opacity: 0;
            transition: opacity 0.4s ease-in-out;
        }
    }
`;

const onFeaturedImageStyle = css`

    ${BackButton} {
        color: ${colors.white};

        i {
            color: ${colors.white};
        }
    }

    ${DetailTitle} {
        transition: color 0.4s ease-in-out;
        color: ${colors.white};
    }

    ${CartToggleIcon},
    ${BurgerIcon} {
        i {
            color: ${colors.white};
        }
    }
`;

class PureNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unfixed: true,
            pinned: false,
            unpinned: false
        };
    }

    headRoomUnfix = () => {
        this.setState({
            pinned: false,
            unpinned: false,
            unfixed: true
        });
    }

    headRoomUnpin = () => {
        this.setState({
            unfixed: false,
            pinned: false,
            unpinned: true
        });
    }

    headRoomPin = () => {
        this.setState({
            unfixed: false,
            unpinned: false,
            pinned: true
        });
    }

    render() {
        const {
            data,
            isIndex,
            isPost,
            isStore,
            isProduct,
            onFeaturedImage,
            burgerClick,
            from,
            detailTitle,
            viewportIs,
            toggleCart,
            className
        } = this.props;

        const { unfixed, pinned, unpinned } = this.state;

        const {
            menu
        } = data.site.siteMetadata;

        const backLink = () => {
            if ('' !== from) {
                return from;
            }

            return '/';
        }

        const backButton = <BackButton to={backLink()}>
            <OiIcon icon='oi-icon-arrow-back' />
            <span>Back</span>
        </BackButton>;

        const detailPageTitle = <DetailTitle>{detailTitle}</DetailTitle>

        const siteLogo = <Logo viewportIs={viewportIs} />;

        const navLeft = (
            <NavLeftWrapper>
                {(isPost || isProduct) ? backButton : <Link to='/'>{siteLogo}</Link>}
            </NavLeftWrapper>
        );

        const navCenter = (
            <NavCenterWrapper>
                { isPost && (typeof detailTitle !== 'undefined') ? detailPageTitle : null }
                <MainMenu menu={menu} isPost={isPost} onFeaturedImage={onFeaturedImage} unfixed={unfixed} />
            </NavCenterWrapper>
        );

        const navRight = (
            <NavRightWrapper>
                <CartToggleIcon toggle={toggleCart} />
                <BurgerIcon onClick={burgerClick}>
                    <OiIcon icon='oi-icon-menu' />
                </BurgerIcon>
            </NavRightWrapper>
        );

        return (
            <HeadroomWrapper
                upTolerance={8}
                downTolerance={8}
                onUnfix={this.headRoomUnfix}
                onUnpin={this.headRoomUnpin}
                onPin={this.headRoomPin}
                pinStart={viewportIs === 'desktop' ? 40 : (viewportIs === 'tablet') ? 20 : 0}
                css={[
                    onFeaturedImage && onFeaturedImageStyle,
                    unpinned && unpinnedStyle,
                    pinned && pinnedStyle,
                    unfixed && unfixedStyle,
                ]}
            >
                <NavigationWrapper className={className}
                    css={[
                        isPost && isPostStyle,
                        isIndex && isIndexStyle,
                        isStore && isStoreStyle,
                        isProduct && isProductStyle,
                    ]}
                >
                    <NavigationInner>
                        {navLeft}
                        {navCenter}
                        {navRight}
                    </NavigationInner>
                </NavigationWrapper>
            </HeadroomWrapper>
        );
    }
}

export const Navigation = (props) => (
    <StaticQuery
        query={graphql`
        query NavigationQuery {
          site {
            siteMetadata {
              title
              description
              copyright
              menu {
                label
                path
              }
            }
          }
        }
      `}
        render={(data) => <PureNavigation {...props} data={data} />}
    />
);

Navigation.propTypes = {
    toggleCart: PropTypes.func.isRequired,
    viewportIs: PropTypes.string
};

export default Navigation;