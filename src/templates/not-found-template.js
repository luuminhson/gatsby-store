import React from 'react';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import { Heading, TextContainer } from '../components/shared/Typography';

const NotFoundPage = () => {
  const { title, description } = useSiteMetadata();
  return (
    <Page title={`404 ‧ ${title}`} description={description}>
      <TextContainer>
        <Heading>404<br />Page Not Found</Heading>
      </TextContainer>
    </Page>
  );
}

export default NotFoundPage;
