import React, { Component } from 'react';
import styled from '@emotion/styled';
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

export const FooterModuleInner = styled(`div`)`
    border-bottom: 1px solid ${colors.neutral2};
    max-height: 68px;
    overflow: hidden;
    transition: all 1s cubic-bezier(.075,.82,.165,1);

    ${mediaQuery.desktop} {
        overflow: visible;
        border-bottom: none;
    }
`;

export const FooterModuleWrapper = styled(`div`)`
    display: inline-block;
    position: relative;

    .expanded {
        transition: all 1s cubic-bezier(.075,.82,.165,1);
    }

    :nth-of-type(1) {
        .expanded {
            max-height: 213px;

            ${mediaQuery.phoneSmall} {
                max-height: 237px;
            }
        }
    }

    :nth-of-type(2) {
        .expanded {
            max-height: 285px;
        }
    }

    :nth-of-type(3) {
        .expanded {
            max-height: 285px;
        }
    }

    :nth-of-type(4) {
        .expanded {
            max-height: 600px;
        }
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
            expanded: false
        };
    }

    componentDidUpdate(prevProps) {
        const viewportChanged = this.props.viewportIs !== prevProps.viewportIs;

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
    }

    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    render() {
        const { className, title, alwaysExpand, children, ...rest } = this.props;
        const { expanded } = this.state;

        return (
            <FooterModuleWrapper className={className} {...rest}>
                <FooterModuleInner className={(expanded || alwaysExpand) ? 'expanded' : 'collapsed'}>
                    {title && (
                        <ModuleTitle onClick={this.toggleExpand}>
                            {title}
                            <ModuleToggle icon={expanded ? 'oi-icon-minus' : 'oi-icon-plus'} />
                        </ModuleTitle>
                    )}
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
