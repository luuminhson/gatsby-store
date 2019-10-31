// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Button } from '../shared/Buttons';
import { FontStyle, spacing, colors } from '../../utils/styles';

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
`;

const CenteredStyle = css`
    justify-content: center;

    ${TitleGroup} {
        justify-content: center;
        align-items: center;
    }
`;

const SectionTitle = ({ children, subtitle, centered, actionLink, actionLabel, className, props }) => (
    <SectionWrapper className={className} css={centered && CenteredStyle} {...props}>
        <TitleGroup>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
            <FontStyle.h3>
                {children}
            </FontStyle.h3>
        </TitleGroup>
        {actionLink && (
            <Button to={actionLink}>
                {actionLabel}
            </Button>
        )
        }
    </SectionWrapper>
);

export default SectionTitle;