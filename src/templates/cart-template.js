import React from 'react';
import Page from '../components/Page';
import CartPage from '../components/Cart/CartPage';
import { useSiteMetadata } from '../hooks';

const NotFoundPage = () => {
    const { title, description } = useSiteMetadata();
    return (
        <Page title={`Cart ‧ ${title}`} description={description} isCart>
            <CartPage />
        </Page>
    );
}

export default NotFoundPage;