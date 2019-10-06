// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Button, FlatButton } from '../shared/Buttons';
import { FontStyle, spacing, colors } from '../../utils/styles';

import InterfaceContext from '../../context/InterfaceContext';

const SectionWrapper = styled(`div`)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${spacing.md}px;
`;

const TitleGroup = styled(`div`)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const SubTitle = styled(FontStyle.h4)`
    font-size: 0.9rem !important;
    text-transform: uppercase;
    color: ${colors.neutral3};
    margin-bottom: ${spacing.xs}px;
`;

const MainTitle = styled(FontStyle.h3)`

`;

const ActionLink = styled(FlatButton)`
    margin-right: -${spacing.md}px;
`;

const CenteredStyle = css`
    justify-content: center;

    ${TitleGroup} {
        justify-content: center;
        align-items: center;
    }
`;

const SectionTitle = ({ children, subtitle, centered, actionLink, actionLabel, className, props }) => (
    <InterfaceContext.Consumer>
        {({ viewportIs }) => (
                <SectionWrapper className={className} css={centered && CenteredStyle} {...props}>
                    <TitleGroup>
                        {subtitle && <SubTitle>{subtitle}</SubTitle>}
                        <MainTitle>
                            {children}
                        </MainTitle>
                    </TitleGroup>
                    {actionLink && (
                        <Button to={actionLink}>
                            {actionLabel}
                        </Button>
                    )
                    }
                </SectionWrapper>
            )}
    </InterfaceContext.Consumer>
);

export default SectionTitle;