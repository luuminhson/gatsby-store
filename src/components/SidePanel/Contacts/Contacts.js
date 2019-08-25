// @flow
import React from 'react';
import styled from '@emotion/styled';
import getContactHref from '../../../utils/get-contact-href';
import getIcon from '../../../utils/get-icon';
import OiIcon from '../../OiIcon';
import { spacing, colors } from '../../../utils/styles';

type Props = {
  contacts: {
    [string]: string,
  },
};

const ContactsWrapper = styled(`div`)`
  margin: ${spacing.xl}px 0 ${spacing.lg}px;
`;

const ContactList = styled(`ul`)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  margin: 0;
  padding: 32px 0;
  border-top: 1px solid ${colors.neutral2};
`;

const ContactListItem = styled(`li`)`
  padding: 0;
  margin: 0;
`;

const ContactListItemLink = styled(`a`)`
  display: flex;
  align-items: center;
  padding: 12px 32px;
  color: ${colors.mainDark};
`;

const ContactIcon = styled(OiIcon)`
  margin-right: 8px;
`;

const Contacts = ({ contacts }: Props) => (
  <ContactsWrapper>
    <ContactList>
      {Object.keys(contacts).map((name) => (
        <ContactListItem key={name}>
          <ContactListItemLink
            href={getContactHref(name, contacts[name])}
            rel="noopener noreferrer"
            target="_blank"
            title={name}
            aria-label={name}
          >
            <ContactIcon icon={getIcon(name)} />
            <span>{contacts[name]}</span>
          </ContactListItemLink>
        </ContactListItem>
      ))}
    </ContactList>
  </ContactsWrapper>
);

export default Contacts;
