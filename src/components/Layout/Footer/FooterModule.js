import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import OiIcon from '../../OiIcon';

import { FontStyle, spacing, mediaQuery, colors } from '../../../utils/styles';

export const ModuleTitle = styled(FontStyle.h3)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: ${spacing.md}px 0;
    margin-bottom: ${spacing.md}px;

    ${mediaQuery.desktop} {
        padding: 0;
        cursor: default;
    }
`;

export const ModuleContent = styled(`div`)`
    width: 100%;
    padding-bottom: ${spacing.lg}px;
`;

export const FooterModuleInner = styled(`div`)``;

export const FooterModuleWrapper = styled(`div`)`
    display: inline-block;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid ${colors.neutral2};
    transition: all 1s cubic-bezier(.075,.82,.165,1);

    &:last-child {
        border-bottom: none;
    }

    ${mediaQuery.desktop} {
        overflow: visible;
        border-bottom: none;
    }
`;

const ModuleToggle = styled(OiIcon)`
    cursor: pointer;

    ${mediaQuery.desktop} {
        display: none;
    }
`;

class FooterModule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: true,
            contentExpandHeight: 0
        };
    }

    componentDidMount() {
        const height = this.moduleHeight.clientHeight;
        this.setState({ contentExpandHeight: height });
        
        // console.log(this.state.contentExpandHeight);
        
        // if (this.state.contentExpandHeight !== 0) {
        //     this.setState({
        //         expanded: false
        //     });
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        const viewportChanged = this.props.viewportIs !== prevProps.viewportIs;
        const contentHeightChanged = this.state.contentExpandHeight !== prevState.contentExpandHeight;

        if (this.props.viewportIs === 'desktop') {
            if (viewportChanged) {
                setTimeout(() => {
                    this.setState({
                        expanded: true
                    });
                }, 500);
            }
        } else {
            if (viewportChanged) {
                this.setState({
                    expanded: false
                });
            }
        }

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
        const { className, viewportIs, title, alwaysExpand, children, ...rest } = this.props;
        const { expanded, contentExpandHeight } = this.state;

        const ModuleCollapsed = css`
            max-height: 68px;
        `;

        const ModuleExpanded = css`
            ${ contentExpandHeight && contentExpandHeight !== 0 &&
                `max-height: ${contentExpandHeight}px;`
            }
        `;

        return (
            <FooterModuleWrapper
                {...rest}
                className={className}
                css={(expanded || alwaysExpand) ? ModuleExpanded : ModuleCollapsed}
                ref={ (divElement) => this.moduleHeight = divElement}
            >
                <FooterModuleInner>
                    {title && (
                        <ModuleTitle onClick={viewportIs === 'desktop' ? null : this.toggleExpand}>
                            {title}
                            <ModuleToggle icon={expanded ? 'oi-icon-minus' : 'oi-icon-plus'} />
                        </ModuleTitle>
                    )}

                    {/* {console.log(this.state.contentExpandHeight)} */}

                    {console.log('expanded: ', this.state.expanded)}

                    <ModuleContent>
                        {children}
                    </ModuleContent>
                </FooterModuleInner>
            </FooterModuleWrapper>
        );
    }
}

FooterModule.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    viewportIs: PropTypes.string,
    alwaysExpand: PropTypes.bool,
};

export default FooterModule;
