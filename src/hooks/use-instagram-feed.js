import { useStaticQuery, graphql } from 'gatsby';

const useInstagramFeed = () => {
    const { allInstaNode } = useStaticQuery(
        graphql`
            query InstaFeed {
                allInstaNode(
                    limit: 50,
                    sort: {fields: timestamp, order: DESC}
                ) {
                    edges {
                        node {
                            id
                            likes
                            comments
                            mediaType
                            localFile {
                                childImageSharp {
                                    fluid(maxWidth: 600, quality: 100) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    );

    return allInstaNode.edges;
};

export default useInstagramFeed;
