// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import Categories from './Categories';
import BackgroundImage from 'gatsby-background-image';
import type { Node } from '../../types';

import { layoutWidth, colors, mediaQuery, fontFamily } from '../../utils/styles';

type Props = {
  post: Node
};

const PostHero = styled(`div`)`
  position: relative;
  margin-bottom: 24px;
`;

const PostFooter = styled(`div`)`
  max-width: ${layoutWidth.blog};
  margin: 0 auto;
  padding: 0 24px 64px;
`;

const mask = css`
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.4);
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%);
`;

const HeaderContent = styled(`div`)`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
  margin-bottom: 32px;
  box-sizing: border-box;
  color: ${colors.mainDark};
  position: relative;
  z-index: 1;

  ${mediaQuery.tabletFrom} {
      max-width: ${layoutWidth.post};
      padding: 20px 0 0;
    }
  }
`;

const Title = styled(`h1`)`
  font-size: ${fontFamily.heading};
  line-height: 28px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ContentMeta = styled(`div`)`
  font-size: 0.8rem;
  color: ${colors.neutral3};
  margin: 20px 0;
`;

const CategoriesWrapper = styled(`div`)`
  display: inline-block;
`;

const CategoriesList = styled(Categories)`
  li {
    a {
      color: ${colors.neutral4};
      font-weight: 500;
      text-decoration: underline;
    }
  }
`;

const HeroImage = styled(BackgroundImage)`
  position: relative;
  height: 60vh;
  min-height: 320px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 2.5rem 2rem 1.8rem;
  box-sizing: border-box;

  ${mediaQuery.tabletFrom} {
    align-items: center;
    text-align: center;
  }

  ${HeaderContent} {
    color: ${colors.white};
    padding: 0;
    margin-bottom: 0;
  }

  ${ContentMeta} {
    color: ${colors.white};
  }

  ${CategoriesWrapper} {
    display: inline-block;
  }

  ${CategoriesList} {
    li {
      position: relative;

      &:after {
        content: ', ';
      }

      &:last-child:after {
        display: none;
      }

      a {
        color: ${colors.white};
      }
    }
  }
`;

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, categorySlugs } = post.fields;
  const { tags, title, date, featuredImage, categories } = post.frontmatter;

  const headerContent = (
    <HeaderContent>
      <Title>{title}</Title>
      <ContentMeta>
        <Meta date={date} />
        {categories && categorySlugs && (
          <CategoriesWrapper>
            <span>&nbsp;in&nbsp;</span>
            <CategoriesList categories={categories} categorySlugs={categorySlugs} />
          </CategoriesWrapper>
        )}
      </ContentMeta>
    </HeaderContent>
  );

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const postHeader = () => {
    if (!isEmpty(featuredImage)) {
      return (
        <HeroImage
          Tag="section"
          fluid={featuredImage.childImageSharp.fluid}
          backgroundColor={'#040e18'}
        >
          <div className={mask} />
          {headerContent}
        </HeroImage>
      );
    } else {
      return headerContent;
    }
  }

  return (
    <div>
      <PostHero>{postHeader()}</PostHero>
      <Content body={html} title={title} />
      <PostFooter>
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
      </PostFooter>
    </div>
  );
};

export default Post;
