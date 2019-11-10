// @flow
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../../LinkWithPrev';
import OiIcon from '../../OiIcon';
import { mediaQuery, colors, fontWeight, fontFamily, spacing } from '../../../utils/styles';

import InterfaceContext from '../../../context/InterfaceContext';

type Props = {
  menu: {
    label: string,
    path: string,
  }[],
  burgerClick: bool,
  isPost: bool,
};

const MenuWrapperInner = styled(`nav`)`
  display: flex;
  position: relative;
  width: 100%;
  padding: 0;

  ${mediaQuery.tabletFrom} {
    display: flex;
  }
`;

const MenuWrapper = styled(`div`)`
  display: flex;
  align-items: center;
  background-color: ${colors.white};

  ${mediaQuery.tabletFrom} {
    ${MenuWrapperInner} {
      display: block;
    }
  }
`;

const MenuList = styled(`ul`)`
  width: 100%;
  list-style: none;
  display: block;
  padding: 0;
  margin: 0;
`;

const MenuListItem = styled(`li`)`
  padding: 0;
  margin: 0;
  border-bottom: 1px solid ${colors.neutral1};
`;

const MenuItemLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${fontFamily.heading};
  font-weight: ${fontWeight.heading.medium};
  font-size: 0.9rem;
  padding: 0 ${spacing.lg}px;
  height: 56px;
  line-height: 56px;
  color: ${colors.mainDark};

  &:hover,
  &:focus {
    color: ${colors.mainDark};
  }
`;

const MenuLinkActiveStyle = css`
  &.activeMenuItem {
    color: ${colors.mainClickable};
  }
`;

const SubmenuWrapper = styled(`div`)`
  margin-top: -${spacing.xs}px;
  padding-bottom: ${spacing.sm}px;
`;

const SubmenuList = styled(`div`)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SubmenuItem = styled(`div`)`
  flex: 1 0 100%;
`;

const SubmenuItemLink = styled(Link)`
  display: block;
  color: ${colors.mainDark};
  font-size: 0.9em;
  white-space: nowrap;
  padding: ${spacing.xs}px ${spacing.md}px ${spacing.xs}px ${spacing['2xl']}px;

  @media (hover: hover) {
    &:hover {
      color: ${colors.mainClickable};
    }
  }
`;

const DropdownIcon = styled(OiIcon)`
  width: 20px;
  height: 20px;
  font-size: 20px;
  line-height: 20px;
  margin-left: ${spacing.xs / 2}px;
`;

const IconSubmenuOpenedCss = css`
  transform: rotate(180deg);
`;

const submenuOpenedCss = css`
  display: block;
`;

const submenuClosedCss = css`
  display: none;
`;

const SubMenuLinkActiveStyle = css`
  &.activeMenuItem {
    color: ${colors.mainClickable};
  }
`;

class Menu extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      submenuIs: null
    };
  }

  render() {
    const {
      data,
      menu,
      isPost,
      unfixed,
      onFeaturedImage,
      toggleSidebar,
      ...rest
    } = this.props;

    const { submenuIs } = this.state;

    const hideSubmenu = (toogleSubmenu, toggleSidebar) => {
      toogleSubmenu(false);
      toggleSidebar();
    }

    const getSubmenu = (submenuType, toggleSubmenu) => {
      let submenu;

      switch (submenuType) {
        case 'productCollections':
          submenu = (
            <SubmenuList>
              {data.allShopifyCollection.edges.map((collection, index) => (
                <SubmenuItem key={index}>
                  <SubmenuItemLink to={`/products/collection/${collection.node.handle}`} css={SubMenuLinkActiveStyle} activeClassName='activeMenuItem' partiallyActive={true} onClick={() => hideSubmenu(toggleSubmenu, toggleSidebar)}>
                    {collection.node.title}
                  </SubmenuItemLink>
                </SubmenuItem>
              ))}
            </SubmenuList>
          );
          break;

        case 'productCategories':
          submenu = (
            <SubmenuList>
              {data.allShopifyProductType.edges.map((category, index) => (
                <SubmenuItem key={index}>
                  <SubmenuItemLink to={`/products/category/${category.node.shopifyId}`} css={SubMenuLinkActiveStyle} activeClassName='activeMenuItem' partiallyActive={true} onClick={() => hideSubmenu(toggleSubmenu, toggleSidebar)}>
                    {category.node.name}
                  </SubmenuItemLink>
                </SubmenuItem>
              ))}
            </SubmenuList>
          );
          break;

        default:
          submenu = null;
          break;
      }

      return submenu;
    };

    const handleSubmenu = (submenu, submenuOpened, toogleSubmenu, toggleSidebar) => event => {
      if (submenu !== null) {
        event.preventDefault();
        this.setState({
          submenuIs: submenu
        });
        toogleSubmenu(submenuOpened === false ? true : (this.state.submenuIs === submenu ? false : true));
      } else {
        toogleSubmenu(false);
      }
      toggleSidebar();
    };

    return (
      <InterfaceContext.Consumer>
        {({
          submenuOpened,
          toggleSubmenu
        }) => (
            <MenuWrapper {...rest}>
              {!isPost && (
                <MenuWrapperInner>
                  <MenuList>
                    {menu.map((item) => (
                      <MenuListItem key={item.path}>
                        <MenuItemLink
                          to={item.path}
                          onClick={handleSubmenu(item.submenu, submenuOpened, toggleSubmenu, () => (item.submenu == null ? toggleSidebar() : null) )}
                          css={MenuLinkActiveStyle}
                          activeClassName='activeMenuItem'
                          partiallyActive={item.path === '/' ? false : true}
                        >
                          <span>{item.label}</span>
                          {item.submenu !== null && <DropdownIcon css={submenuIs === item.submenu && submenuOpened && IconSubmenuOpenedCss} icon='oi-icon-drop-down' />}
                        </MenuItemLink>
                        {item.submenu !== null &&
                          <SubmenuWrapper css={(submenuIs === item.submenu && submenuOpened) ? submenuOpenedCss : submenuClosedCss}>
                            {getSubmenu(item.submenu, toggleSubmenu)}
                          </SubmenuWrapper>
                        }
                      </MenuListItem>
                    ))}
                  </MenuList>
                </MenuWrapperInner>
              )}
            </MenuWrapper>
          )}
      </InterfaceContext.Consumer>
    )
  }
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query submenuSidebarQuery{
          allShopifyCollection{
              edges {
                  node {
                      title
                      descriptionHtml
                      handle
                      image {
                          id
                          localFile {
                              childImageSharp {
                                  resize(width: 910, height: 910) {
                                      src
                                  }
                                  fluid(maxWidth: 910, quality: 80) {
                                      ...GatsbyImageSharpFluid
                                  }
                              }
                          }
                      }
                  }
              }
          }
          allShopifyProductType {
              edges {
                  node {
                    name
                    shopifyId
                }
              }
          }
      }
    `}
    render={data => (
      <InterfaceContext.Consumer>
        {({
          toggleSubmenu
        }) => (
            <Menu
              {...props}
              data={data}
              toggleSubmenu={toggleSubmenu}
            />
          )}
      </InterfaceContext.Consumer>
    )}
  />
);
