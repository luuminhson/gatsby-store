import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            menu {
              label
              path
              submenu
            }
            siteUrl
            title
            subtitle
            description
            contacts {
              phone
              email
              facebook
              instagram
            }
          }
        }
      }
    `
  );

  return site.siteMetadata;
};

export default useSiteMetadata;
