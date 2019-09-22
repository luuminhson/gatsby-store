// @flow
import React from 'react';
import styled from '@emotion/styled';
import kebabCase from 'lodash/kebabCase';
import Widget from '../../Widget';
import { Link } from '../../LinkWithPrev';
import { useTagsList } from '../../../hooks';
import { fontFamily, colors } from '../../../utils/styles';

type Props = {
    tagCount: bool
};

const TagWidget = styled(Widget)`
.tags-widget__inner {
    &__list {
        list-style: none;
        padding: 0;
        margin: 16px 0 0;

        &__item {
            padding: 0;
            margin: 0;
            display: inline-block;

            &__link {
                display: block;
                padding: 2px 12px;
                margin: 0 12px 12px 0;
                background-color: rgba(0,0,0,0.04);
                font-family: ${fontFamily.heading};
                border-radius: 4px;

                &:hover,
                &:active {
                    background-color: rgba(0,0,0,0.06);
                }
                
                &__name {
                    color: ${colors.mainDark};
                }

                &__count {
                    position: relative;
                    top: -2px;
                    display: inline-block;
                    min-width: 16px;
                    height: 16px;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    padding: 2px;
                    margin-left: 4px;
                    color: ${colors.mainDark};
                    background-color: rgba(0,0,0,0.06);
                    border-radius: 20px;
                }

            }
        }
    }
}
`;

const TagsWidget = ({ tagCount }: Props) => {
    const tags = useTagsList();

    return (
        <TagWidget sectionTitle={'Tags'}>
            <div className={'tags-widget__inner'}>
                <ul className={'tags-widget__inner__list'}>
                    {tags.map((tag) => (
                        <li className={'tags-widget__inner__list__item'} key={tag.fieldValue}>
                            <Link to={`/blog/tag/${kebabCase(tag.fieldValue)}/`} className={'tags-widget__inner__list__item__link'}>
                                <span className={'tags-widget__inner__list__item__link__name'}>{tag.fieldValue}</span>
                                {tagCount &&
                                    <span className={'tags-widget__inner__list__item__link__count'}>{tag.totalCount}</span>
                                }
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </TagWidget>
    );
};

export default TagsWidget;
