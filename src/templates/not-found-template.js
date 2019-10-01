import React from 'react';
import styled from '@emotion/styled';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

import { FontStyle } from '../utils/styles';

const Heading = styled(FontStyle.h1)`
  text-align: center;
`;

const NotFoundPage = () => {
  const { title, description } = useSiteMetadata();
  return (
    <Page pageTitle='404' title={`404 - Page Not Found ‧ ${title}`} description={description}>
        <Heading>Page Not Found</Heading>
    </Page>
  );
}

export default NotFoundPage;
