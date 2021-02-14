// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Button } from '../shared/Buttons';
import { FontStyle, fontFamily, fontWeight, spacing, colors } from '../../utils/styles';

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
    font-family: ${fontFamily.body};
    font-weight: ${fontWeight.body.medium};
    font-size: 1.125rem !important;
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
            <Button to={actionLink} small>
                {actionLabel}
            </Button>
        )
        }
    </SectionWrapper>
);

export default SectionTitle;