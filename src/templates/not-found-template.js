import React from 'react';
import Layout from '../components/Layout';
import { useSiteMetadata } from '../hooks';
import { Heading, TextContainer } from '../components/shared/Typography';

const NotFoundPage = () => {
  const { title, description } = useSiteMetadata();
  return (
    <Layout title={`404 ‧ ${title}`} description={description}>
      <TextContainer>
        <Heading>Whoops - That Page Doesn’t Exist (404)</Heading>
      </TextContainer>
    </Layout>
  );
}

export default NotFoundPage;
