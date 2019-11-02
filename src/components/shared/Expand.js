import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import OiIcon from '../OiIcon';

import { FontStyle, spacing, mediaQuery, colors } from '../../utils/styles';

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

export const ModuleTitle = styled(FontStyle.h3)`
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    align-items: center;
    padding: ${spacing.md}px 0;
    cursor: pointer;

    ${mediaQuery.tabletFrom} {
        font-size: 1rem;
    }
`;

export const ModuleContent = styled(`div`)`
    width: 100%;
    display: inline-block;
`;

export const ToggleIcon = styled(OiIcon)`
    cursor: pointer;
    color: ${colors.neutral4};
`;


class Expand extends Component {
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

    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    render() {
        const { className, title, alwaysExpand, children, ...rest } = this.props;
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
                    <ModuleTitle
                        onClick={alwaysExpand ? null : this.toggleExpand}
                        css={alwaysExpand && alwaysExpandTitle}
                        ref={ (titleElement) => this.titleHeight = titleElement }
                    >
                        {title}
                        {!alwaysExpand && <ToggleIcon icon={expanded ? 'oi-icon-minus' : 'oi-icon-plus'} /> }
                    </ModuleTitle>
                )}

                <ModuleContent>
                    {children}
                </ModuleContent>
            </ExpandWrapper>
        )
    }
}

Expand.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    alwaysExpand: PropTypes.bool,
};

export default Expand;