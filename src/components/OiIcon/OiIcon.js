import React from 'react';
import PropTypes from 'prop-types';
import { injectGlobal } from 'emotion';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors } from '../../utils/styles';

// Import OiIcon typeface
import '../../fonts/oi-icon/stylesheet.css';

const Icon = styled('i')`
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    color: ${colors.mainDark};
`;

const OiIcon = ({ icon, className, ...rest }) => (
    <Icon className={`${icon} ${className}`} {...rest} />
);

OiIcon.propTypes = {
    icon: PropTypes.string.isRequired
};

export default OiIcon;