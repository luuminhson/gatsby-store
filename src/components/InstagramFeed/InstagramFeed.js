// @flow
import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { useInstagramFeed } from '../../hooks';
import postTypeBg from './assets/insta-post-type.png'
import postLikesBg from './assets/insta-like.png'
import postCommentsBg from './assets/insta-comment.png'
import { colors, mediaQuery, radius, spacing } from '../../utils/styles';

const InstagramFeedWrapper = styled(`div`)`
    display: flex;
    flex-wrap: wrap;
    margin: ${props => (props.gap)}px -${props => (props.gap/2)}px;

    ${mediaQuery.tabletFrom} {
        margin: -${props => (props.gap/2)}px;
    }
`;

const InstaPostItem = styled(`div`)`
    flex: 1 0 50%;
    padding: ${props => (props.gap/2)}px;

    ${mediaQuery.tabletFrom} {
        flex: 1 0 33.3333%;
    }

    ${mediaQuery.desktop} {
        flex: 1 0 calc(100%/${props => (props.cols)});
    }

    ${ImgLink} {

    }
`;

const PostMask = styled(`div`)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    opacity: 0;
    z-index: 2;
`;

const Meta = styled(`div`)`
    position: absolute;
    top: 50%;
    left: 50%;
    height: 32px;
    line-height: 32px;
    color: ${colors.white};
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    font-size: 1rem;
    font-weight: 600;
    display: inline-flex;
    transform: translate(-50%, -50%);
    z-index: 10;

    > div {
        padding-left: ${spacing.xl}px;
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: 0 0;
    }
`;

const Likes = styled(`div`)`
    background-image: url(${postLikesBg});
    
`;

const Comments = styled(`div`)`
    background-image: url(${postCommentsBg});
    margin-left: ${spacing.lg}px;
`;

const ImgLink = styled(`a`)`
    display: block;
    position: relative;
    border-radius: ${radius.large}px;
    overflow: hidden;
    
    @media (hover: hover) {
        &:hover {
            ${PostMask} {
                opacity: 1;
            }
        }
    }
`;

const InstaPostImg = styled(Img)`
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;

    &:after {
        position: absolute;
        top: 0;
        right: 0;
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        background: url(${postTypeBg}) no-repeat;
        background-size: 200%;
        background-position: ${props => (props.postType === 'GraphImage' ? '200% 200%' : props.postType === 'GraphSidecar' ? '0% 0%' : '0 100%')};
        z-index: 1;
    }
`;

const InstagramFeed = ({ total, cols, gap }: Props) => {
    const feed = useInstagramFeed();
    const feedArray = feed.map((edge) => (
        <InstaPostItem cols={cols} gap={gap} key={edge.node.id}>
            <ImgLink href={'https://www.instagram.com/p/' + edge.node.id} target='_blank'>
                <PostMask>
                    <Meta>
                        <Likes>{edge.node.likes ? edge.node.likes : 0}</Likes>
                        <Comments>{edge.node.comments ? edge.node.comments : 0}</Comments>
                    </Meta>
                </PostMask>
                <InstaPostImg fluid={edge.node.localFile.childImageSharp.fluid} postType={edge.node.mediaType} />
            </ImgLink>
        </InstaPostItem>
    )).slice(0, total);

    return (
        <InstagramFeedWrapper gap={gap}>
            {feedArray}
        </InstagramFeedWrapper>
    );
};

export default InstagramFeed;