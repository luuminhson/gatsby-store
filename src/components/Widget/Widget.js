// @flow
import React from 'react';
import { css } from '@emotion/core';
import SectionTitle from '../SectionTitle';

type Props = {
    children: React.Node,
    sectionTitle: string,
    sectionLink: String,
    sectionLinkLabel: string,
    className: string
};

const InnerStyle = css`
    margin-bottom: 32px;
`;

const BodyStyle = css`
    padding: 12px 0;
`;

const Widget = ({
    children,
    sectionTitle,
    sectionLink,
    sectionLinkLabel,
    className
}: Props) => {
    return (
        <div className={className}>
            <div className={InnerStyle}>
                <SectionTitle
                    title={sectionTitle}
                    actionLink={sectionLink}
                    actionLabel={sectionLinkLabel}
                />
                <div className={BodyStyle}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Widget;
