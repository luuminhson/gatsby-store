// @flow
import React from 'react';
import styled from '@emotion/styled';
import { FlatButton } from '../shared/Buttons';
import { FontStyle, spacing } from '../../utils/styles';

const SectionWrapper = styled(`div`)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ActionLink = styled(FlatButton)`
    margin-right: -${spacing.md}px;
`;

const SectionTitle = ({ title, actionLink, actionLabel, className }) => (
    <SectionWrapper className={className}>
        <FontStyle.h3>{title}</FontStyle.h3>
        { actionLink &&
            <ActionLink to={actionLink}>
                {actionLabel}
            </ActionLink>
        }
    </SectionWrapper>
);

export default SectionTitle;