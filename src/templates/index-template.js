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

import InstagramFeed from '../components/InstagramFeed';

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

  ${mediaQuery.tabletFrom} {
    margin-bottom: 5%;
  }
`;

// HERO SECTION

const HeroSection = styled(`section`)`
  position: relative;  
  display: grid;
  grid-template-rows: auto;
  row-gap: ${spacing.xl}px;
  padding: 0 ${spacing.lg}px;
  margin: 5vh 0 15vh;

  ${mediaQuery.tabletFrom} {
    grid-template-columns: 40% 55%;
    column-gap: 5%;
    padding: 0;
  }

  ${mediaQuery.tabletPortrait} {
    margin: 2vh 0 10vh;
  }
`;

const HeroImage = styled(Img)`
  width: 75%;
  height: 35vh;
  min-height: 250px;
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
  min-height: 180px;
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
    font-size: 3.6rem;
    line-height: 4rem;
    max-width: 68vw;
    margin-bottom: ${spacing.xl}px;
  }

  ${mediaQuery.tabletPortrait} {
    font-size: 3rem;
    line-height: 3.25rem;
  }

  ${mediaQuery.desktop} {
    font-size: 4rem;
    line-height: 4.85rem;
  }

  ${mediaQuery.desktopLarge} {
    font-size: 5.6rem;
    line-height: 6rem;
  }

  ${mediaQuery.desktopXLarge} {
    font-size: 6rem;
    line-height: 6.75rem;
  }
`;

// LATEST PRODUCTS SECTION

const LastestProductsSection = styled(`div`)`
  padding: 0 ${spacing.lg}px;
  margin: 15vh 0;

  ${mediaQuery.tabletFrom} {
    padding: 0;
  }

  ${mediaQuery.tabletPortrait} {
    margin: 10vh 0;
  }
`;

const ProductsWrapper = styled(`div`)`
  height: 78vw;
  overflow: hidden;
  margin: 0 -${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    height: auto;
    margin: 0 -${spacing.xl}px;
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
      flex: 1 0 33.33%;
      padding: 0 ${spacing.xl}px;
      max-width: none;
    
      &:last-child {
          padding-right: ${spacing.xl}px;
      }
    }
  }

  ${mediaQuery.tabletFrom} {
    padding: 0;

    > a {
      margin: 0;
      flex-basis: calc(33.3333% - ${spacing.xl * 2}px);
    }
  }
`;

// ABOUT INTRO SECTION

const AboutIntroSection = styled(`div`)`
  padding: 0 ${spacing.lg}px;
  margin: 15vh 0;

  ${mediaQuery.tabletFrom} {
    padding: 0;
  }

  ${mediaQuery.tabletPortrait} {
    margin: 10vh 0;
  }

  ${mediaQuery.desktop} {

  }
`;

const AboutIntroRow1 = styled(`div`)`
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  ${mediaQuery.tabletLandscapeFrom} {
    flex-direction: row;

    ${TitleGroup} {
      order: 1;
      width: calc(50vw - ${spacing['4xl']}px);
      padding-right: 5%;

      p {
        padding-right: 5%;
      }
    }
  }

  ${mediaQuery.desktop} {
    ${TitleGroup} {
      padding-right: 10%;

      p {
        padding-right: 10%;
      }
    }
  }

  ${mediaQuery.desktopLarge} {
    padding-left: 10%;
  }
`;

const AboutIntroRow2 = styled(`div`)`
  display: flex;
`;

const AboutImg1 = styled(Img)`
  width: 65vw;
  height: 40vh;
  margin-top: ${spacing.xl}px;
  border-radius: ${radius.large}px;

  ${mediaQuery.tabletFrom} {

  }

  ${mediaQuery.tabletLandscapeFrom} {
    order: 0;
    width: 50vw;
    height: 55vh;
    margin-top: ${spacing['8xl']}px;
    margin-right: ${spacing['4xl']}px;
  }

  ${mediaQuery.desktop} {

  }

  ${mediaQuery.desktopLarge} {
    margin-right: ${spacing['8xl']}px;
  }
`;

const AboutImg2 = styled(Img)`
  display: inline-block;
  margin-top: ${spacing.xl}px;
  width: 40%;
  height: 25vh;
  border-radius: ${radius.large}px;

  ${mediaQuery.tabletFrom} {

  }

  ${mediaQuery.tabletLandscapeFrom} {
    margin-top: ${spacing['4xl']}px;
    margin-left: 10%;
    width: 25%;
    height: 35vh;
  }

  ${mediaQuery.desktop} {
    margin-left: 20%;
    width: 20%;
    height: 30vh;
  }

  ${mediaQuery.desktopXLarge} {

  }
`;

const AboutImg3 = styled(Img)`
  display: inline-block;
  width: calc(60% - ${spacing.xl}px);
  height: 35vh;
  margin-top: calc(-20vh + ${spacing['4xl']}px);
  margin-left: ${spacing.xl}px;
  border-radius: ${radius.large}px;

  ${mediaQuery.tabletFrom} {

  }

  ${mediaQuery.tabletLandscapeFrom} {
    width: calc(50% - ${spacing['4xl']}px);
    height: 50vh;
    margin-top: -20vh;
    margin-left: ${spacing['4xl']}px;
  }

  ${mediaQuery.desktop} {
    width: 35%;
    height: 40vh;
    margin-left: ${spacing['4xl']}px;
    margin-top: -15vh;
  }

  ${mediaQuery.desktopXLarge} {
    margin-top: -25vh;
  }
`;

// LATEST BLOG SECTION

const IndexStrip = styled(Strip)``;

const LastestBlogSection = styled(`div`)`
  margin: 15vh 0;
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

  ${mediaQuery.tabletPortrait} {
    margin: 10vh 0;
  }
`;

// INSTA FEED SECTION

const InstaFeedSection = styled(`div`)`
  margin: 15vh 0;
  padding: 0 ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    padding: 0;
  }

  ${mediaQuery.tabletPortrait} {
    margin: 10vh 0;
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
    const indexIntroImage1Src = data.indexIntroImage1.childImageSharp.fluid;
    const indexIntroImage2Src = data.indexIntroImage2.childImageSharp.fluid;
    const indexIntroImage3Src = data.indexIntroImage3.childImageSharp.fluid;

    const latestProductList = data.latestProducts.edges;

    const instaFeedGap = viewportIs === 'desktop' || viewportIs === 'tablet' || viewportIs === 'tabletLandscape' ? 64 : 24;

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
            <AboutIntroSection>
              <AboutIntroRow1>
                <TitleGroup>
                  <SectionTitle>Bánh và những cung bậc cảm xúc</SectionTitle>
                  <p>Nhấm nháp mỗi chiếc bánh và cảm nhận sự gần gũi với thiên nhiên cùng những cảm xúc bình dị thường ngày.</p>
                  <Button css={{ marginTop: '16px' }} to='/about' small>Xem thêm</Button>
                </TitleGroup>
                <AboutImg1 fluid={indexIntroImage1Src} />
              </AboutIntroRow1>
              <AboutIntroRow2>
                <AboutImg2 fluid={indexIntroImage2Src} />
                <AboutImg3 fluid={indexIntroImage3Src} />
              </AboutIntroRow2>
            </AboutIntroSection>
          </ScrollAnimation>

          <ScrollAnimation>
            <LastestBlogSection>
              <TitleGroup>
                <SectionTitle subtitle='Bài viết mới nhất' actionLabel='Xem tất cả' actionLink='/blog'>Blog</SectionTitle>
              </TitleGroup>
              <IndexStrip edges={blogPost} />
            </LastestBlogSection>
          </ScrollAnimation>

          <ScrollAnimation>
            <InstaFeedSection>
              <TitleGroup>
                <SectionTitle subtitle='Khoảnh khắc ngày thường' actionLabel='@banh.oi' externalLink='https://www.instagram.com/banh.oi/' newTab>Banh Oi's Instagram</SectionTitle>
              </TitleGroup>
              <InstagramFeed total={6} cols={6} gap={instaFeedGap} />
            </InstaFeedSection>
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
    indexIntroImage1: file(relativePath: { eq: "index-intro-1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    indexIntroImage2: file(relativePath: { eq: "index-intro-2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    indexIntroImage3: file(relativePath: { eq: "index-intro-3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
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
