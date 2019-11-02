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


class AccordionItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        const { className, title, isExpanded, onClick, children, ...rest } = this.props;
        const { titleHeight, contentExpandHeight } = this.state;

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

        return (
            <ExpandWrapper
                {...rest}
                className={className && className}
                css={isExpanded ? ModuleExpanded : ModuleCollapsed}
                ref={(contentElement) => this.moduleHeight = contentElement}
            >
                {title && (
                    <ModuleTitle
                        onClick={onClick}
                        ref={(titleElement) => this.titleHeight = titleElement}
                    >
                        {title}
                        <ToggleIcon icon={isExpanded ? 'oi-icon-minus' : 'oi-icon-plus'} />
                    </ModuleTitle>
                )}

                <ModuleContent>
                    {children}
                </ModuleContent>
            </ExpandWrapper>
        )
    }
}

AccordionItem.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.any.isRequired
};

// ACCORDION

const AccordionWrapper = styled(`div`)``;

const normalItem = css`
    border-bottom: 1px solid ${colors.neutral2};

    &:first-of-type {
        border-top: 1px solid ${colors.neutral2};
    }

    ${ModuleContent} {
        padding-bottom: ${spacing.lg}px;
    }
`;

const activeItem = css``;

class Accordion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: null
        };
    }

    toggleExpand = (idx) => event => {
        event.preventDefault();

        this.setState({
            opened: this.state.opened === idx ? null : idx
        });
    }

    render() {

        const { data, className, activeClassName, ...rest } = this.props;
        const { opened } = this.state;

        return (
            <AccordionWrapper className={className} {...rest}>
                {data.map((item, index) => {

                    const isActive = opened == index;

                    return (
                        <AccordionItem
                            key={index}
                            onClick={this.toggleExpand(index)}
                            isExpanded={isActive ? true : false}
                            css={[normalItem, isActive && activeItem]}
                            title={item.title}
                        >
                            {item.content}
                        </AccordionItem>
                    )
                })}
            </AccordionWrapper>
        )
    }
}

export default Accordion;