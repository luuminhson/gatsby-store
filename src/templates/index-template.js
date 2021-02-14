// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import ScrollAnimation from '../components/shared/ScrollAnimation';
import Page from '../components/Page';
import SectionTitle from '../components/SectionTitle';
import Strip from '../components/Strip';
import Img from 'gatsby-image';
import { Button, PrimaryButton } from '../components/shared/Buttons';
import ProductListingItem from '../components/ProductListingItem';
import type { AllMarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { mediaQuery, spacing, FontStyle, radius, dimensions, headerHeight, colors } from '../utils/styles';

type Props = {
  data: AllMarkdownRemark
};

const IndexWrapper = styled(`div`)`
  margin: 0 auto;
  padding-bottom: ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    margin-top: 0;
    padding: 0 ${spacing.xl}px;
    max-width: ${dimensions.indexPageWidth};
  }

  ${mediaQuery.desktop} {
    padding: 0 ${spacing['4xl']}px;
  }
`;

const TitleGroup = styled(`div`)`
  margin-bottom: 3%;
`;

// HERO SECTION

const HeroImage = styled(Img)`
  width: 75%;
  height: 35vh;
  margin-left: 25%;
  border-radius: ${radius.large}px;

  ${mediaQuery.tabletFrom} {
    width: 100%;
    max-width: 720px;
    height: auto;
    max-height: 560px;
    margin: 0 auto;
  }
`;

const HeroImageSub = styled(Img)`
  width: 50%;
  height: 20vh;
  margin-top: -${spacing['8xl']}px;
  margin-right: 55%;
  border-radius: ${radius.large}px;

  ${mediaQuery.tabletFrom} {
    width: 30vw;
    max-width: 560px;
    height: auto;
    max-height: 360px;
    margin-top: -40%;
    margin-left: 60%;
    margin-right: auto;
  }

  ${mediaQuery.desktop} {
    margin-top: -30%;
    margin-left: 80%;
    margin-right: auto;
  }
`;

const MaskText = styled('span')`
  color: transparent;
  overflow: hidden;
  background: url('${props => props.maskSrc}') center center;
  background-size: cover;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -o-background-clip: text;
  background-clip: text;
`;

const HeroTitle = styled(FontStyle.h1)`
  font-size: 3.6rem;
  line-height: 4.4rem;
  margin-bottom: ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    font-size: 2.4rem;
    line-height: 3rem;
    max-width: 68vw;
    margin-bottom: ${spacing.xl}px;
  }

  ${mediaQuery.desktop} {
    font-size: 4rem;
    line-height: 4.85rem;
  }

  ${mediaQuery.desktopLarge} {
    font-size: 6rem;
    line-height: 6.75rem;
  }
`;

const HeroSection = styled(`section`)`
  position: relative;  
  display: grid;
  grid-template-rows: auto;
  row-gap: ${spacing.xl}px;
  padding: 0 ${spacing.lg}px;
  margin: 5% 0 15%;

  ${mediaQuery.tabletFrom} {
    grid-template-columns: 40% 55%;
    column-gap: 5%;
    padding: 0;
  }
`;

// LATEST PRODUCTS SECTION

const ProductsWrapper = styled(`div`)`
  height: 78vw;
  overflow: hidden;
  margin: 0 -${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    height: auto;
    margin: 0 -${spacing.sm}px;
  }
`;

const ProductListingContainer = styled(`div`)`
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding: 0 ${spacing.sm}px;
  transform: translateZ(0);

  > a {
    flex: 1 0 100%;
    max-width: 60vw;
    scroll-snap-align: center;
    position: relative;
    padding: 0 ${spacing.md - 4}px;
    margin: ${spacing.sm}px 0 ${spacing['2xl']}px;

    &:last-child {
        max-width: calc(60vw + ${spacing.sm}px);
        padding-right: ${spacing.lg}px;
    }

    ${mediaQuery.tabletFrom} {
      flex: 1 0 25%;
      max-width: none;
    
      &:last-child {
          padding-right: ${spacing.md}px;
      }
    }
  }

  ${mediaQuery.tabletFrom} {
    padding: 0;

    > a {
      margin: 0;
      flex-basis: calc(33.33% - 24px);
    }
  }
`;

const LastestProductsSection = styled(`div`)`
  padding: 0 ${spacing.lg}px;
  margin: 12% 0;

  ${mediaQuery.tabletFrom} {
    padding: 0;
  }
`;

// LATEST BLOG SECTION

const IndexStrip = styled(Strip)``;

const LastestBlogSection = styled(`div`)`
  margin: 12% 0 0;
  padding: 0 ${spacing.lg}px;

  ${IndexStrip} {
    margin: 0 -${spacing.lg}px;
  }

  ${mediaQuery.tabletFrom} {
    padding: 0;

    ${IndexStrip} {
      margin: 0;
    }
  }
`;

class IndexTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data, viewportIs } = this.props;

    const { title, subtitle, description } = data.site.siteMetadata;
    const blogPost = data.blogStrip.edges;

    const heroImageSrc = data.heroImage.childImageSharp.fluid;
    const heroImageSubSrc = data.heroImageSub.childImageSharp.fluid;
    const heroTitleMaskSrc = data.heroTitleMaskImage.childImageSharp.fluid.src;

    const latestProductList = data.latestProducts.edges;

    return (
      <Page title={`${title} ‧ ${subtitle}`} description={description} pageIs='Index'>
        <IndexWrapper>
          <ScrollAnimation>
            <HeroSection>
              <TitleGroup>
                <HeroTitle>Happiness is <MaskText maskSrc={heroTitleMaskSrc}>homemade</MaskText></HeroTitle>
                <PrimaryButton to='/products'>Mua bánh về ăn</PrimaryButton>
              </TitleGroup>
              <HeroImage fluid={heroImageSrc} />
              <HeroImageSub fluid={heroImageSubSrc} />
            </HeroSection>
          </ScrollAnimation>

          <ScrollAnimation>
            <LastestProductsSection>
              <TitleGroup>
                <SectionTitle subtitle='Bánh mới' actionLabel='Xem tất cả' actionLink='/products'>Cookies &amp; Cakes</SectionTitle>
              </TitleGroup>
              <ProductsWrapper>
                <ProductListingContainer>
                  {latestProductList.map(({ node: product }) => (
                    <ProductListingItem key={product.id} product={product} />
                  ))}
                </ProductListingContainer>
              </ProductsWrapper>
            </LastestProductsSection>
          </ScrollAnimation>

          <ScrollAnimation>
            <LastestBlogSection>
              <TitleGroup>
                <SectionTitle subtitle='Bài viết mới nhất' actionLabel='Xem tất cả' actionLink='/blog'>Blog</SectionTitle>
              </TitleGroup>
              <IndexStrip edges={blogPost} />
            </LastestBlogSection>
          </ScrollAnimation>
        </IndexWrapper>
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToIndexPage,
      viewportIs
    }) => (
      <IndexTemplate
        {...props}
        setPage={setToIndexPage}
        viewportIs={viewportIs}
      />
    )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query IndexTemplate {
    site {
      siteMetadata {
        title
        subtitle
        description
      }
    }
    blogStrip: allMarkdownRemark(
        limit: 3,
        skip: 0,
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlugs
          }
          frontmatter {
            title
            date
            categories
            description
            featuredImage {
              childImageSharp {
                resize(width: 500, height: 500) {
                  src
                }
                fluid(maxWidth: 900) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    },
    heroImage: file(relativePath: { eq: "index-demo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    heroImageSub: file(relativePath: { eq: "index-demo-sub.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    heroTitleMaskImage: file(relativePath: { eq: "hero-title-mask.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    latestProducts: allShopifyProduct(
      limit: 3,
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          variants {
            shopifyId
            title
            price
            compareAtPrice
            availableForSale
          }
          images {
            id
            localFile {
              childImageSharp {
                resize(width: 910, height: 910) {
                  src
                }
                fluid(maxWidth: 910, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
