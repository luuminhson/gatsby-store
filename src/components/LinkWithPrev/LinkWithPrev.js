import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Location } from '@reach/router';
import { Link } from 'gatsby';

const LinkStyle = css`
  -webkit-tap-highlight-color: transparent;
`;

const LinkWithPrevUrl = ({ children, className, state, ...rest }) => (
  <Location>
    {({ location }) => (
      //make sure user's state is not overwritten
      <Link className={className && `${className}`} css={LinkStyle} {...rest} state={{ prevUrl: location.pathname, ...state}}>
        { children }
      </Link>
    )}
  </Location>
)

export { LinkWithPrevUrl as Link };