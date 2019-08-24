// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery, Link } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Headroom from 'react-headroom';
import Logo from './Logo';
import Menu from './Menu';
import CartToggle from '../../Cart/CartToggle';
import { FontStyle, fontFamily, dimensions, shadow, colors, mediaQuery } from '../../../utils/styles';

const NavigationWrapper = styled(`div`)`
    width: 100%;
    z-index: 2000;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background: ${colors.white};
        box-shadow: ${shadow.navShadow};
    }
`;

const NavigationInner = styled(`div`)`
    position: relative;
    height: ${dimensions.headerHeightMobile};
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    ${mediaQuery.tabletFrom} {
        height: ${dimensions.headerHeightTablet};
    }

    ${mediaQuery.desktop} {
        height: ${dimensions.headerHeightDesktop};
    }
`;

const BackButton = styled(Link)`
    font-family: ${fontFamily.heading};
    width: 60px;
    height: ${dimensions.headerHeightMobile};
    line-height: ${dimensions.headerHeightMobile};
    font-size: 1.75rem;
    font-weight: 400;
    color: $color-base;
    padding-left: 12px;
    margin-left: -0.75rem;
    box-sizing: border-box;
`;

const DetailTitle = styled(FontStyle.h1)`
    display: inline-block;
    font-size: 0.85rem;
    line-height: $nav-height;
    color: $color-base;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0 12px;
`;

const NavRightWrapper = styled(`div`)`
    display: flex;
    align-items: center;
`;

const unpinnedStyle = css``;

const pinnedStyle = css``;

const HeadroomWrapper = styled(Headroom)`
    width: 100%;
    position: relative;
    z-index: 100;

    &${unpinnedStyle} {
        ${NavigationWrapper} {
            &:before {
                box-shadow: none;
                transition: box-shadow 0.5s cubic-bezier(0, 0.78, 0.57, 1.05);
            }
        }
    }

    &${pinnedStyle} {
        ${NavigationWrapper} {
            &:before {
                box-shadow: $nav-shadow-light;
                transition: box-shadow 0.5s cubic-bezier(0, 0.78, 0.57, 1.05);
            }
        }
    }
`;

const isIndexStyle = css``;

const isPostStyle = css``;

const unfixedStyle = css`
    ${NavigationWrapper} {
        &${isIndexStyle} {
            &:before {
                opacity: 0;
                box-shadow: none;
                transition: all 0.4s ease-in-out;
            }
        }

        ${DetailTitle} {
            opacity: 0;
            transition: opacity 0.4s ease-in-out;
        }
    }

    ${mediaQuery.tabletFrom} {
        ${NavigationWrapper} {
            &${isIndexStyle} {
                &:before {
                    opacity: 1;
                    background: $color-nav-light;
                    box-shadow: $nav-shadow-light;
                }
            }
        }
    }
`;

const onFeaturedImageStyle = css`
    ${NavigationWrapper} {
        &:before {
            opacity: 0;
            box-shadow: none;
            transition: all 0.4s ease-in-out;
        }

        ${NavigationInner} {
            ${BackButton},
            ${DetailTitle} {
                color: $color-white;
                transition: color 0.4s ease-in-out;
            }
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
            // pinned: false,
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
            onFeaturedImage,
            burgerClick,
            from,
            detailTitle,
            isDesktopViewport,
            toggleCart,
            className
        } = this.props;

        const { unfixed, pinned, unpinned } = this.state;

        const {
            menu
        } = data.site.siteMetadata;

        const isDetailScreen = isPost;

        const backLink = () => {
            if ('' !== from) {
                return from;
            }

            return '/';
        }

        const backButton = <BackButton to={backLink()}>←</BackButton>;

        const detailPageTitle = <DetailTitle>{detailTitle}</DetailTitle>

        const siteLogo = <Logo isDesktopViewport={isDesktopViewport} />;

        const navLeft = isDetailScreen ? backButton : siteLogo;

        const navCenter = ( isDetailScreen && ( typeof detailTitle !== 'undefined' ) ) ? detailPageTitle : null;

        const navRight = (
            <NavRightWrapper>
                <Menu menu={menu} burgerClick={burgerClick} isPost={isPost} onFeaturedImage={onFeaturedImage} unfixed={unfixed} />
                <CartToggle toggle={toggleCart} />
            </NavRightWrapper>
        );

        return (
            <HeadroomWrapper
                upTolerance={8}
                downTolerance={8}
                onUnfix={this.headRoomUnfix}
                onUnpin={this.headRoomUnpin}
                onPin={this.headRoomPin}
                css={[
                    unpinned && unpinnedStyle,
                    pinned && pinnedStyle,
                    (isIndex || isDetailScreen) && unfixed && unfixedStyle,
                    isDetailScreen && onFeaturedImage && onFeaturedImageStyle,
                ]}
            >
                <NavigationWrapper className={className}
                    css={[
                        isPost && isPostStyle,
                        isIndex && isIndexStyle
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
    isDesktopViewport: PropTypes.bool
  };

export default Navigation;