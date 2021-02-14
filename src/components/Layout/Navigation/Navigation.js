// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import Headroom from 'react-headroom';
import { Link } from 'gatsby';
import Logo from './Logo';
import Menu from './Menu';
import OiIcon from '../../OiIcon';
import CartToggle from '../../Cart/CartToggle';
import CartNumber from '../../Cart/CartNumber';
import { dimensions, mediaQuery, spacing, colors, shadow } from '../../../utils/styles';

import InterfaceContext from '../../../context/InterfaceContext';

/* --------------------------- STYLES --------------------------- */

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

// DESKTOP NAV STYLES

const NavigationWrapper = styled(`div`)`
    position: relative;
    width: 100%;
    padding: 0 ${spacing.lg}px;
    animation: ${startFade} 1s ease forwards;
    transition: all 0.3s ease-in-out;
    z-index: 100;

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
    transition: height 0.2s ease-in-out;

    ${mediaQuery.tabletFrom} {
        height: ${dimensions.navHeightTablet};
    }
`;

const NavLeftWrapper = styled(`div`)`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

const DesktopNavLogo = styled(Logo)``;

const NavCenterWrapper = styled(`div`)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    ${mediaQuery.tabletFrom} {
        position: absolute;
        width: calc(100% - 280px);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const NavRightWrapper = styled(`div`)`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    margin-right: -${spacing.xs}px;

    ${mediaQuery.tabletFrom} {
        margin-right: 0;
    }
`;

const CartToggleIcon = styled(CartToggle)`
    display: flex;
`;

const MainMenu = styled(Menu)`
    ${mediaQuery.tabletFrom} {
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // display: block;
        // transform: translate(-50%, -50%);
    }
`;

// MOBILE NAV STYLES

const MobileNavLogo = styled(Logo)`
    svg {
        width: 108px;
        height: 56px;
    }
`;

const MobileNavIconWrapper = styled(`div`)`
    position: relative;
    padding: ${spacing.sm}px;
    cursor: pointer;

    > * {
        display: block;
        width: 24px;
        height: 24px;
    }
`;

const CartItemNumber = styled(CartNumber)`
  position: absolute;
  top: 6px;
  right: 4px;
  z-index: 2900;
`;

const NavWhite = css`
    ${DesktopNavLogo},
    ${MobileNavLogo} {
        svg {
            fill: ${colors.white};
        }
    }

    ${CartToggleIcon},
    ${MobileNavIconWrapper} {
        i {
            color: ${colors.white};
        }
    }

    ${MainMenu} {
        ul > li > a {
            color: ${colors.white};

            i {
                color: ${colors.white};
            }

            &.activeMenuItem,
            &.activeMenuItem > i {
                color: ${colors.mainClickable};
            }
        }
    }
`;

// HEADROOM STYLE

const HeadroomWrapper = styled(Headroom)`
    width: 100%;
    position: relative;
    z-index: 100;
`;

const unpinnedStyle = css``;

const pinnedStyle = css`
    ${NavigationWrapper} {
        background-color: #fafafa;
        box-shadow: ${shadow.navShadow};
        
        ${NavigationInner} {
            height: ${dimensions.navHeightMobile};

            ${mediaQuery.tabletFrom} {
                height: ${dimensions.navHeightTablet};
            }
        }

        ${DesktopNavLogo},
        ${MobileNavLogo} {
            svg {
                fill: ${colors.black};
            }
        }

        ${MainMenu} {
            ul > li > a {
                color: ${colors.mainDark};
    
                i {
                    color: ${colors.mainDark};
                }
    
                &.activeMenuItem,
                &.activeMenuItem > i {
                    color: ${colors.mainClickable};
                }
            }
        }
    
        ${CartToggleIcon},
        ${MobileNavIconWrapper} {
            i {
                color: ${colors.mainDark};
            }
        }
    }
`;

const unfixedStyle = css`
    ${NavigationWrapper} {
        ${NavigationInner} {
            height: ${dimensions.navHeightMobile};

            ${mediaQuery.tabletFrom} {
                height: ${dimensions.navHeightTablet};
            }
        }
    }
`;

/* --------------------------- DESKTOP NAVIGATION --------------------------- */

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
        this.props.toggleSubmenu(false);
    }

    headRoomUnpin = () => {
        this.setState({
            unfixed: false,
            pinned: false,
            unpinned: true
        });
        this.props.toggleSubmenu(false);
    }

    headRoomPin = () => {
        this.setState({
            unfixed: false,
            unpinned: false,
            pinned: true
        });
        this.props.toggleSubmenu(false);
    }

    render() {
        const {
            data,
            toggleCart,
            from,
            pageIs,
            viewportIs,
            cartNumber,
            toggleSidebar,
            className
        } = this.props;

        const { unfixed, pinned, unpinned } = this.state;

        const { menu } = data.site.siteMetadata;

        // Back Button for backup

        const backLink = () => {
            if (null !== from) {
                return from;
            }
            return '/';
        }

        const backButton = (
            <MobileNavIconWrapper>
                <Link to={backLink()}>
                    <OiIcon icon='oi-icon-arrow-back' />
                </Link>
            </MobileNavIconWrapper>
        );

        const navLeft = (
            <NavLeftWrapper>
                <Link to='/'><DesktopNavLogo /></Link>
            </NavLeftWrapper>
        );

        const navCenter = (
            <NavCenterWrapper>
                <MainMenu menu={menu} />
            </NavCenterWrapper>
        );

        const navRight = (
            <NavRightWrapper>
                <CartToggleIcon toggle={toggleCart} />
            </NavRightWrapper>
        );

        const mobileNavLeft = (
            <NavLeftWrapper>
                <Link to='/' css={{ lineHeight: 0 }}><MobileNavLogo /></Link>
            </NavLeftWrapper>
        )

        const mobileNavRight = (
            <NavRightWrapper>
                <MobileNavIconWrapper>
                    <Link to='/cart'>
                        <OiIcon icon='oi-icon-cart' />
                        <CartItemNumber number={cartNumber} />
                    </Link>
                </MobileNavIconWrapper>
                <MobileNavIconWrapper>
                    <div onClick={toggleSidebar}>
                        <OiIcon icon='oi-icon-menu' />
                    </div>
                </MobileNavIconWrapper>
            </NavRightWrapper>
        );

        const pinStart = viewportIs === 'desktop' ? dimensions.navPaddingTopDesktop : (viewportIs === null ? dimensions.navPaddingTopPhone : dimensions.navPaddingTopTablet);

        return (

            <HeadroomWrapper
                upTolerance={8}
                downTolerance={8}
                pinStart={pinStart}
                onUnfix={this.headRoomUnfix}
                onUnpin={this.headRoomUnpin}
                onPin={this.headRoomPin}
                css={[
                    unpinned && unpinnedStyle,
                    pinned && pinnedStyle,
                    unfixed && unfixedStyle
                ]}
            >
                {(viewportIs === null || viewportIs === 'tablet') ?
                    <NavigationWrapper
                        className={className}
                        css={(pageIs === 'Post') && NavWhite}
                    >
                        <NavigationInner>
                            {mobileNavLeft}
                            {mobileNavRight}
                        </NavigationInner>
                    </NavigationWrapper>
                    :
                    <NavigationWrapper className={className} css={pageIs === 'Post' && NavWhite}>
                        <NavigationInner>
                            {navLeft}
                            {navCenter}
                            {navRight}
                        </NavigationInner>
                    </NavigationWrapper>
                }

            </HeadroomWrapper>

        );
    }
}

PureNavigation.propTypes = {
    viewportIs: PropTypes.string,
    toggleCart: PropTypes.func.isRequired,
    burgerClick: PropTypes.func.isRequired,
};

const Navigation = (props) => (
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
                submenu
              }
            }
          }
        }
      `}
        render={(data) => (
            <InterfaceContext.Consumer>
                {({
                    toggleSubmenu
                }) => (
                        <PureNavigation {...props} data={data} toggleSubmenu={toggleSubmenu} />
                    )}
            </InterfaceContext.Consumer>
        )}
    />
);

export default Navigation;