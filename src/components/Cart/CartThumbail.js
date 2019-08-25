import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { colors, radius } from '../../utils/styles';

const CartThumbailRoot = styled(Image)`
  background-color: ${colors.mainLight};
  border-radius: ${radius.large}px;
  height: 100px;
  width: 100px;
`;

const CartThumbail = ({
  shopifyImages,
  id: imageId,
  fallback,
  ...imageProps
}) => {
  const image = shopifyImages.find(({ id }) => id === imageId);

  if (image) {
    imageProps.fluid = image.localFile.childImageSharp.fluid;
  } else {
    imageProps.src = fallback;
  }

  return <CartThumbailRoot {...imageProps} />;
};

export default props => (
  <StaticQuery
    query={graphql`
      {
        allShopifyProduct {
          edges {
            node {
              images {
                id
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ allShopifyProduct: { edges } }) => {
      const images = edges
        .map(({ node }) => node.images)
        .reduce((acc, val) => acc.concat(val), []);

      return <CartThumbail shopifyImages={images} {...props} />;
    }}
  />
);
