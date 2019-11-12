// @flow
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../../LinkWithPrev';
import MenuExpand from './MenuExpand';
import { mediaQuery, colors, fontWeight, fontFamily, spacing } from '../../../utils/styles';

type Props = {
  menu: {
    label: string,
    path: string,
    submenu: string,
  }[],
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
`;

const MenuLinkActiveStyle = css`
  &.activeMenuItem {
    color: ${colors.mainClickable};
  }
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
  color: ${colors.neutral5};
  font-size: 0.9em;
  white-space: nowrap;
  padding: ${spacing.xs}px ${spacing.lg}px ${spacing.xs}px;

  @media (hover: hover) {
    &:hover {
      color: ${colors.mainClickable};
    }
  }
`;

const SubMenuLinkActiveStyle = css`
  &.activeMenuItem {
    color: ${colors.mainClickable};
  }
`;

class Menu extends React.Component<Props> {
  render() {
    const {
      data,
      menu,
      toggleSidebar,
      ...rest
    } = this.props;

    const getSubmenu = (submenuType) => {
      let submenu;

      switch (submenuType) {
        case 'productCollections':
          submenu = (
            <SubmenuList>
              {data.allShopifyCollection.edges.map((collection, index) => (
                <SubmenuItem key={index}>
                  <SubmenuItemLink to={`/products/collection/${collection.node.handle}`} css={SubMenuLinkActiveStyle} activeClassName='activeMenuItem' partiallyActive={true} onClick={toggleSidebar}>
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
                  <SubmenuItemLink to={`/products/category/${category.node.shopifyId}`} css={SubMenuLinkActiveStyle} activeClassName='activeMenuItem' partiallyActive={true} onClick={toggleSidebar}>
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

    return (
      <MenuWrapper {...rest}>
        <MenuWrapperInner>
          <MenuList>
            {menu.map((item) => (
              item.submenu === null ?
                <MenuListItem key={item.path}>
                  <MenuItemLink
                    to={item.path}
                    onClick={toggleSidebar}
                    css={MenuLinkActiveStyle}
                    activeClassName='activeMenuItem'
                    partiallyActive={item.path === '/' ? false : true}
                  >
                    <span>{item.label}</span>
                  </MenuItemLink>
                </MenuListItem>
                :
                <MenuListItem key={item.path}>
                  <MenuExpand title={item.label} menuLink={item.path}>
                    {getSubmenu(item.submenu)}
                  </MenuExpand>
                </MenuListItem>
            ))}
          </MenuList>
        </MenuWrapperInner>
      </MenuWrapper>
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
    render={data => <Menu {...props} data={data} />}
  />
);
