// @flow
import React from 'react';
import styled from '@emotion/styled';
import kebabCase from 'lodash/kebabCase';
import Widget from '../../Widget';
import { Link } from '../../LinkWithPrev';
import { useCategoriesList } from '../../../hooks';
import { fontFamily, colors, fontWeight } from '../../../utils/styles';

const CategoryWidget = styled(Widget)`
.categories-widget__inner {
    &__list {
        list-style: none;
        padding: 0;
        margin: 0;

        &__item {
            padding: 0;
            margin: 0;

            &__link {
                display: block;
                padding: 12px 0;
                font-family: ${fontFamily.heading};
                
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
                    font-weight: ${fontWeight.body.medium};
                    line-height: 16px;
                    text-align: center;
                    padding: 0 2px;
                    margin-left: 4px;
                    font-family: ${fontFamily.body};
                    color: ${colors.mainDark};
                    background-color: rgba(0,0,0,0.06);
                    border-radius: 20px;
                }

            }
        }
    }
}
`;

const CategoriesWidget = () => {
    const categories = useCategoriesList();

    return (
        <CategoryWidget className={'categories-widget'} sectionTitle={'Categories'}>
            <div className={'categories-widget__inner'}>
                <ul className={'categories-widget__inner__list'}>
                    {categories.map((category) => (
                        <li className={'categories-widget__inner__list__item'} key={category.fieldValue}>
                            <Link to={`/blog/category/${kebabCase(category.fieldValue)}/`} className={'categories-widget__inner__list__item__link'}>
                                <span className={'categories-widget__inner__list__item__link__name'}>{category.fieldValue}</span>
                                <span className={'categories-widget__inner__list__item__link__count'}>{category.totalCount}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </CategoryWidget>
    );
};

export default CategoriesWidget;
