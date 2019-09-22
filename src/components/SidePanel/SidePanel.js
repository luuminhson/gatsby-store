// @flow
import React from 'react';
import styled from '@emotion/styled';
import Contacts from './Contacts';
import Menu from './Menu';
import { useSiteMetadata } from '../../hooks';
import { mediaQuery, spacing, colors } from '../../utils/styles';

type Props = {
  isIndex?: boolean,
};

const SidePanelWrapper = styled(`div`)`
  width: 100%;
  height: 120vh;
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

const ContactModule = styled(Contacts)`
  margin: ${spacing.xl}px 0 ${spacing.lg}px;

  > ul {
    padding: 32px 0;
    border-top: 1px solid ${colors.neutral2};

    > li > a {
      padding: 12px 32px;
    }
  }
`;

const SidePanel = ({ className }: Props) => {
  const { contacts, menu } = useSiteMetadata();

  return (
    <SidePanelWrapper className={className}>
      <div className='sidebar__inner'>
        <SidePanelMenu menu={menu} />
        <ContactModule contacts={contacts} />
      </div>
    </SidePanelWrapper>
  );
};

export default SidePanel;
