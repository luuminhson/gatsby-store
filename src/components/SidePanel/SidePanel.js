// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Contacts from './Contacts';
import Menu from './Menu';
import OiIcon from '../OiIcon';
import { useSiteMetadata } from '../../hooks';
import { mediaQuery, spacing, colors, FontStyle } from '../../utils/styles';

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

const SidePanelInner = styled(`div`)`
  
`;

const SidePanelHeader = styled(`div`)`
  display: flex;
  justify-content: space-between;
  align-items: center;  
  height: 64px;
  padding: 0 ${spacing.lg}px;
  border-bottom: 1px solid ${colors.neutral1};
`;

const SidePanelTitle = styled(FontStyle.h3)``;

const SidePanelContent = styled(`div`)`
  overflow-y: scroll;
  -webkit-overflow-scrolling: auto;
  touch-action: auto;
  height: calc(100vh - 64px);
`;

const SidePanelCloseBtn = css`
  width: 48px;
  height: 48px;
  line-height: 48px;
  margin-right: -${spacing.md}px;
`;

const SidePanelMenu = styled(Menu)`
  width: 100%;
`;

const ContactModuleTitle = styled(FontStyle.h3)`
  padding: ${spacing.md}px ${spacing.lg}px ${spacing.xs}px;
`;

const ContactModule = styled(Contacts)`
  margin-bottom: ${spacing['8xl'] - 12}px;

  > ul {
    > li {
      width: 100%;

      > a {
        display: flex;
        align-items: center;
        padding: ${spacing.sm}px ${spacing.lg}px;
      }
    }
  }
`;

const SidePanel = ({ className, toggleSidebar }: Props) => {
  const { contacts, menu } = useSiteMetadata();

  return (
    <SidePanelWrapper className={className}>
      <SidePanelInner>
        <SidePanelHeader>
          <SidePanelTitle>Menu</SidePanelTitle>
          <OiIcon icon='oi-icon-close' css={SidePanelCloseBtn} onClick={toggleSidebar} />
        </SidePanelHeader>
        <SidePanelContent>
          <SidePanelMenu menu={menu} toggleSidebar={toggleSidebar} />
          <ContactModuleTitle>Liên Hệ</ContactModuleTitle>
          <ContactModule contacts={contacts} />
        </SidePanelContent>
      </SidePanelInner>
    </SidePanelWrapper>
  );
};

export default SidePanel;
