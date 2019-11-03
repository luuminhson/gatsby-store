'use strict';

const path = require('path');
const _ = require('lodash');
const createCategoriesPages = require('./pagination/create-categories-pages.js');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createBlogPages = require('./pagination/create-blog-pages.js');

const createPages = async ({ graphql, actions }) => {

  const { createPage } = actions;

  /* SHOPIFY PRODUCT PAGES
  ------------------------------------------------ */

  const pages = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `);

  pages.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/products/${edge.node.handle}`,
      component: path.resolve('./src/templates/product-detail-template.js'),
      context: {
        id: edge.node.id,
        handle: edge.node.handle
      }
    });
  });

  /* SHOPIFY CATEGORY PAGES
  ------------------------------------------------ */

  const shopifyCategoryPages = await graphql(`
    {
      allShopifyProductType {
        edges {
          node {
            name
            shopifyId
          }
        }
      }
    }
  `);

  shopifyCategoryPages.data.allShopifyProductType.edges.forEach(edge => {
    createPage({
      path: `/products/category/${edge.node.shopifyId}`,
      component: path.resolve('./src/templates/product-category-template.js'),
      context: {
        productType: edge.node.name
      }
    });
  });

  /* SHOPIFY COLLECTION PAGES
  ------------------------------------------------ */

  const shopifyCollectionPages = await graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            handle
            title
            id
          }
        }
      }
    }
  `);

  shopifyCollectionPages.data.allShopifyCollection.edges.forEach(edge => {
    createPage({
      path: `/products/collection/${edge.node.handle}`,
      component: path.resolve('./src/templates/product-collection-template.js'),
      context: {
        collection: edge.node.title,
        id: edge.node.id
      }
    });
  });

  /* POSTS & PAGES FROM MARKDOWNS
  ------------------------------------------------ */

  const markDownResult = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { edges } = markDownResult.data.allMarkdownRemark;

  _.each(edges, (edge) => {
    if (_.get(edge, 'node.frontmatter.template') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/markdown-page-template.js'),
        context: { slug: edge.node.fields.slug }
      });
    } else if (_.get(edge, 'node.frontmatter.template') === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/markdown-post-template.js'),
        context: { slug: edge.node.fields.slug }
      });
    }
  });

  /* HOME
  ------------------------------------------------ */

  createPage({
    path: '/',
    component: path.resolve('./src/templates/index-template.js')
  });

  /* 404
  ------------------------------------------------ */

  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js')
  });

  /* CART
  ------------------------------------------------ */

  createPage({
    path: '/cart',
    component: path.resolve('./src/templates/cart-template.js')
  });

  /* MORE
  ------------------------------------------------ */

  createPage({
    path: '/more',
    component: path.resolve('./src/templates/more-template.js')
  });

  /* PRODUCT LIST
  ------------------------------------------------ */

  createPage({
    path: '/products',
    component: path.resolve('./src/templates/products-template.js')
  });

  /* POST LIST (BLOG)
  ------------------------------------------------ */

  createPage({
    path: '/blog',
    component: path.resolve('./src/templates/blog-template.js')
  });

  /* TAG LIST
  ------------------------------------------------ */

  createPage({
    path: '/blog/tags',
    component: path.resolve('./src/templates/tags-list-template.js')
  });

  /* CATEGORY LIST
  ------------------------------------------------ */

  createPage({
    path: '/blog/categories',
    component: path.resolve('./src/templates/categories-list-template.js')
  });

  /* FEEDS
  ------------------------------------------------ */

  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createBlogPages(graphql, actions);

};

module.exports = createPages;
