// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Button } from '../shared/Buttons';
import { PAGINATION } from '../../constants';

import { colors, fontFamily } from '../../utils/styles';

type Props = {
  prevPagePath: string,
  nextPagePath: string,
  hasNextPage: boolean,
  hasPrevPage: boolean
};

const PaginationWrapper = styled(`div`)`
  margin-top: 32px;
  display: flex;
`;

const PrevButtonWrapper = styled(`div`)`
  width: 50%;
  text-align: left;
`;

const NextButtonWrapper = styled(`div`)`
  width: 50%;
  text-align: right;
`;

const NavButton = styled(Button)`
  color: ${colors.mainClickable};
  font-family: ${fontFamily.heading}

  &:hover,
  &:focus {
    color: ${colors.mainClickable};
  }
`;

const DisabledStyle = css`
  pointer-events: none;
  color: ${colors.neutral3};
`;

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage
}: Props) => {
  const prevBtn = (
    <NavButton rel="prev" link={prevPagePath} className={!hasPrevPage && DisabledStyle} label={PAGINATION.PREV_PAGE} />
  );

  const nextBtn = (
    <NavButton rel="next" link={nextPagePath} className={!hasNextPage && DisabledStyle} label={PAGINATION.NEXT_PAGE} />
  );

  return (
    <PaginationWrapper>
      <PrevButtonWrapper>
        {hasPrevPage && prevBtn}
      </PrevButtonWrapper>
      <NextButtonWrapper>
        {hasNextPage && nextBtn}
      </NextButtonWrapper>
    </PaginationWrapper>
  );
};

export default Pagination;
