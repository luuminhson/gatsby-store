import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { Link } from '../../LinkWithPrev';
import OiIcon from '../../OiIcon';

import { FontStyle, fontFamily, fontWeight, spacing, mediaQuery, colors } from '../../../utils/styles';

export const ExpandWrapper = styled(`div`)`
    display: block;
    position: relative;
    overflow: hidden;
    padding: 0;
    margin: 0;
    transition: all 1s cubic-bezier(.075,.82,.165,1);

    ${mediaQuery.desktop} {
        overflow: visible;
    }
`;

export const ModuleTitle = styled(`h4`)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    padding: 0 ${spacing.lg}px;
    font-weight: ${fontWeight.heading.medium};
    margin: 0;
    height: 56px;
    line-height: 56px;
`;

export const ModuleContent = styled(`div`)`
    width: 100%;
    display: inline-block;
    padding-bottom: ${spacing.lg}px;
`;

export const ToggleIcon = styled(OiIcon)`
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 20px;
    margin-right: -2px;
    color: ${colors.neutral4};
`;

const IconOpenedCss = css`
  transform: rotate(180deg);
`;

const MenuLinkActiveStyle = css`
  color: ${colors.mainDark};

  &.activeMenuItem {
    color: ${colors.mainClickable};
  }
`;

class MenuExpand extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: true,
            titleHeight: 0,
            contentExpandHeight: 0
        };
    }

    componentDidMount() {
        const titleHeight = this.titleHeight.clientHeight;
        const contentHeight = this.moduleHeight.clientHeight;

        this.setState({
            titleHeight: titleHeight,
            contentExpandHeight: contentHeight
        });
    
    }

    componentDidUpdate(prevProps, prevState) {
        const contentHeightChanged = this.state.contentExpandHeight !== prevState.contentExpandHeight;

        if (contentHeightChanged) {
            this.setState({ expanded: false })
        }
    }

    toggleExpand = () => event => {
        event.preventDefault();

        this.setState({
            expanded: !this.state.expanded,
        });
    }

    render() {
        const { className, title, alwaysExpand, children, isExpanded, menuLink, ...rest } = this.props;
        const { expanded, titleHeight, contentExpandHeight } = this.state;

        const ModuleCollapsed = css`
            ${ titleHeight && titleHeight !== 0 &&
                `max-height: ${titleHeight}px;`
            }
        `;

        const ModuleExpanded = css`
            ${ contentExpandHeight && contentExpandHeight !== 0 &&
            `max-height: ${contentExpandHeight}px;`
            }
        `;

        const alwaysExpandTitle = css`
            cursor: default;
        `;

        return (
            <ExpandWrapper
                {...rest}
                className={className}
                css={(expanded || alwaysExpand) ? ModuleExpanded : ModuleCollapsed}
                ref={ (contentElement) => this.moduleHeight = contentElement }
            >
                {title && (
                    <Link
                        to={menuLink}
                        onClick={alwaysExpand ? null : this.toggleExpand()}
                        css={MenuLinkActiveStyle}
                        activeClassName='activeMenuItem'
                        partiallyActive={menuLink === '/' ? false : true}
                    >
                        <ModuleTitle
                            // onClick={alwaysExpand ? null : this.toggleExpand}
                            css={alwaysExpand && alwaysExpandTitle}
                            ref={ (titleElement) => this.titleHeight = titleElement }
                            // css={[MenuLinkActiveStyle, alwaysExpand && alwaysExpandTitle]}
                            // activeClassName='activeMenuItem'
                            // partiallyActive={true}
                        >
                            {title}
                            {!alwaysExpand && <ToggleIcon icon='oi-icon-drop-down' css={expanded && IconOpenedCss} /> }
                        </ModuleTitle>
                    </Link>
                )}

                <ModuleContent>
                    {children}
                </ModuleContent>
            </ExpandWrapper>
        )
    }
}

MenuExpand.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    alwaysExpand: PropTypes.bool,
    isExpanded: PropTypes.bool,
    menuLink: PropTypes.string
};

export default MenuExpand;