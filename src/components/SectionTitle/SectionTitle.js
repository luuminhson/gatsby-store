// @flow
import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';

const SectionWrapper = styled(`div`)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled(`h2`)`
    font-size: 16px;
    line-height: 24px;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin: 0;
`;

const ActionLink = styled(Button)`
    margin-right: -0.75rem;
`;

const SectionTitle = ({ title, actionLink, actionLabel, className }) => (
    <SectionWrapper className={className}>
        <Title>{title}</Title>
        { actionLink && <ActionLink link={actionLink} label={actionLabel} onDark /> }
    </SectionWrapper>
);

export default SectionTitle;