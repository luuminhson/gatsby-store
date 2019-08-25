// @flow
import React from 'react';
import styled from '@emotion/styled';
import Contacts from './Contacts';
import Menu from './Menu';
import { useSiteMetadata } from '../../hooks';
import { mediaQuery, dimensions, colors } from '../../utils/styles';

type Props = {
  isIndex?: boolean,
};

const SidePanelWrapper = styled(`div`)`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  &__inner {
    position: relative;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SidePanelMenu = styled(Menu)`
  width: 100%;
  margin-top: 16px;

  ${mediaQuery.tabletFrom} {
      // display: none;
  }
`;

const SidePanel = ({ className }: Props) => {
  const { contacts, menu } = useSiteMetadata();

  return (
    <SidePanelWrapper className={className}>
      <div className='sidebar__inner'>
        <SidePanelMenu menu={menu} />
        <Contacts contacts={contacts} />
      </div>
    </SidePanelWrapper>
  );
};

export default SidePanel;
