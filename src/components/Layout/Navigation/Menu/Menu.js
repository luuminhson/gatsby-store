// @flow
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../../../LinkWithPrev';
import OiIcon from '../../../OiIcon';

import InterfaceContext from '../../../../context/InterfaceContext';

import { mediaQuery, colors, fontWeight, fontFamily, spacing, radius, shadow } from '../../../../utils/styles';

type Props = {
  menu: {
    label: string,
    path: string,
  }[],
  burgerClick: bool,
  isPost: bool,
  unfixed: bool,
  dark: bool,
};

const MenuWrapperInner = styled(`nav`)`
  display: none;
  position: relative;
  padding: 0;

  ${mediaQuery.tabletFrom} {
    display: flex;
  }
`;

const MenuWrapper = styled(`div`)`
  display: flex;
  align-items: center;

  ${mediaQuery.tabletFrom} {
    ${MenuWrapperInner} {
      display: block;
    }
  }
`;

const SubmenuWrapper = styled(`div`)`
  position: absolute;
  top: 100%;
  left: 50%;
  padding-top: ${spacing.md}px;
`;

const SubmenuList = styled(`div`)`
  position: relative;
  display: flex;
  background-color: ${colors.white};
  padding: 0 ${spacing.sm}px;
  border-radius: ${radius.large}px;
  box-shadow: ${shadow.blockItemShadow};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    display: block;
    width: 16px;
    height: 16px;
    background-color: ${colors.white};
    transform: rotate(45deg) translateX(-50%);
    border-radius: ${radius.default}px;
  }
`;

const SubmenuItem = styled(`div`)``;

const SubmenuItemLink = styled(Link)`
  display: block;
  color: ${colors.mainDark};
  white-space: nowrap;
  padding: ${spacing.lg}px;

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

const MenuList = styled(`ul`)`
  list-style: none;
  display: block;
  padding: 0;
  margin: 0;
`;

const MenuListItem = styled(`li`)`
  position: relative;
  display: inline-block;
  width: auto;
  padding: 0;
  margin: 0;

  @media (hover: hover) {
    &:hover {
      ${SubmenuWrapper} {
        display: block;
      }
    }
  }
`;

const MenuItemLink = styled(Link)`
  display: flex;
  align-items: center;
  font-family: ${fontFamily.heading};
  font-weight: ${fontWeight.heading.bold};
  font-size: 0.95rem;
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
  color: ${colors.mainDark};

  &:hover,
  &:focus {
    color: ${colors.mainDark};
  }
`;

const MenuLinkActiveStyle = css`
  &.activeMenuItem {
    position: relative;
    color: ${colors.mainClickable};

    i {
      color: ${colors.mainClickable};
    }
  }
`;

const IconSubmenuOpenedCss = css`
  transform: rotate(180deg);
`;

const submenuOpenedCss = css`
  opacity: 1;
  visibility: visible;
  transform: translate3d(-50%, 0, 0);
  z-index: 1000;
  transition: all 0.8s cubic-bezier(.075,.82,.165,1);
`;

const submenuClosedCss = css`
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-50%, 10px, 0);
  z-index: -1;
  transition: all 0.4s cubic-bezier(.075,.82,.165,1);
`;

class Menu extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      submenuIs: null
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.toggleSubmenu(false);
    }
  }

  render() {
    const { menu, data, ...rest } = this.props;
    const { submenuIs } = this.state;

    const hideSubmenu = (toogleSubmenu) => {
      toogleSubmenu(false);
    }

    const getSubmenu = (submenuType, toggleSubmenu) => {
      let submenu;

      switch (submenuType) {
        case 'productCollections':
          submenu = (
            <SubmenuList>
              {data.allShopifyCollection.edges.map((collection, index) => (
                <SubmenuItem key={index}>
                  <SubmenuItemLink to={`/products/collection/${collection.node.handle}`} css={MenuLinkActiveStyle} activeClassName='activeMenuItem' partiallyActive={true} onClick={() => hideSubmenu(toggleSubmenu)}>
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
                  <SubmenuItemLink to={`/products/category/${category.node.shopifyId}`} css={MenuLinkActiveStyle} activeClassName='activeMenuItem' partiallyActive={true} onClick={() => hideSubmenu(toggleSubmenu)}>
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

    const handleSubmenu = (submenu, submenuOpened, toogleSubmenu) => event => {
      if (submenu !== null) {
        event.preventDefault();
        this.setState({
          submenuIs: submenu
        });
        toogleSubmenu(submenuOpened === false ? true : (this.state.submenuIs === submenu ? false : true));
      } else {
        toogleSubmenu(false);
      }
    };

    return (
      <InterfaceContext.Consumer>
        {({
          submenuOpened,
          toggleSubmenu
        }) => (
            <MenuWrapper {...rest} ref={this.setWrapperRef}>
              <MenuWrapperInner>
                <MenuList>
                  {menu.map((item) => (
                    <MenuListItem key={item.path}>
                      <MenuItemLink
                        to={item.path}
                        onClick={handleSubmenu(item.submenu, submenuOpened, toggleSubmenu)}
                        css={MenuLinkActiveStyle}
                        activeClassName='activeMenuItem'
                        partiallyActive={(item.path === '/' || item.path === null) ? false : true}
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
            </MenuWrapper>
          )}
      </InterfaceContext.Consumer>
    )
  }
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query submenuQuery{
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