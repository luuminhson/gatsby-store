import React from 'react';
import { graphql } from 'gatsby';
import ScrollAnimation from 'react-animate-on-scroll';
import Page from '../components/Page';
import CartPage from '../components/Cart/CartPage';

import InterfaceContext from '../context/InterfaceContext';

class CartTemplate extends React.Component<Props> {

    componentDidMount() {
        this.props.setPage();
    }

    render() {

        const { title, description } = this.props.data.site.siteMetadata;

        return (
            <Page mainTitle='Giỏ hàng' title={`Giỏ hàng ‧ ${title}`} description={description} pageIs='Cart'>
                <ScrollAnimation animateOnce animateIn='fadeIn'>
                    <CartPage />
                </ScrollAnimation>
            </Page>
        )
    }
}

export default props => (
    <InterfaceContext.Consumer>
        {({
            setToCartPage,
        }) => (
                <CartTemplate
                    {...props}
                    setPage={setToCartPage}
                />
            )}
    </InterfaceContext.Consumer>
)

export const query = graphql`
  query CartTemplate {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
