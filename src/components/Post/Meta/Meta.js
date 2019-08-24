// @flow
import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
// import styles from './Meta.module.scss';

type Props = {
  date: string,
  className: string
};

const MetaWrapper= styled(`div`)`
  display: inline-block;
`;

const Meta = ({ date, className }: Props) => (
  <MetaWrapper className={className}>
    <span>Published {moment(date).format('D MMM YYYY')}</span>
  </MetaWrapper>
);

export default Meta;
