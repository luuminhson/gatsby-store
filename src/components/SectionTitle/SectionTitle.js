// @flow
import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import { FontStyle } from '../../utils/styles';

const SectionWrapper = styled(`div`)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled(FontStyle.h2)`
    font-size: 20px;
    line-height: 28px;
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