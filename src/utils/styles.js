import styled  from '@emotion/styled';
import { keyframes } from '@emotion/core';

const path = require('path');

/*
 * NOTE: use a six-character hex code for all colors to allow alpha channel
 * adjustment without adding extra vars and/or a color manipulation lib.
 *
 * Example:
 *    // use the brand color at 25% opacity
 *    border-color: ${colors.brand}40;
 */

/* COLORS
--------------------------------------------------------------- */

export const colors = {
  brand:          '#D24D57',
  brandLight:     '#f5f3f7',
  brandLighter:   '#fbfafc',
  lightest:       '#ffffff',
  darkest:        '#4d4058',
  text:           '#333333',
  textMild:       '#555555',
  textLight:      '#7e718a',
  textLighter:    '#aaaaaa',
  lilac:          '#8c65b3',
  accent:         '#ffb238',
  error:          '#ec1818',

  black:          '#000000',
  white:          '#ffffff',

  mainDark:       '#222222',
  mainLight:      '#F9F9FB',

  mainBranding:   '#1F3A93', // Jacksons Purple
  mainClickable:  '#D24D57', // Chesnut Rose
  mainHighlight:  '#F9B42D', // Sea Buckthorn
  mainSupport:    '#1BA39C', // Light Sea Green

  neutral1:       '#F6F7F9', // Mystic
  neutral2:       '#E4E9ED', // Solitude
  neutral3:       '#6C7A89', // Lynch
  neutral4:       '#6C7A89', // Lynch
  neutral5:       '#4A5460', // Lynch Dark
  neutral6:       '#2E3131', // Outter Space

  darkTrans:      'rgba(232,236,241,0.4)',
  lightTrans:     'rgba(249,249,251,0.8)',
};

/* LAYOUT WIDTH
--------------------------------------------------------------- */

export const layoutWidth = {
  post: '745px',
}

/* MEDIA QUERIES
--------------------------------------------------------------- */

export const breakpoints = {
  mobile:           400,
  phablet:          550,
  tablet:           750,
  tabletLandscape:  1024,
  desktop:          1280,
  hd:               1440,
  fhd:              1920,
};

export const mediaQuery = {
  phoneSmall:       `@media (max-width: ${breakpoints.mobile - 1}px)`,
  phoneLarge:       `@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet - 1}px)`,
  phone:            `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tablet:           `@media (min-width: ${breakpoints.phablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  tabletPortrait:   `@media (min-width: ${breakpoints.phablet}px) and (max-width: ${breakpoints.tabletLandscape - 1}px) and (orientation: portrait)`,  
  tabletLandscape:  `@media (min-width: ${breakpoints.phablet}px) and (max-width: ${breakpoints.tabletLandscape}px) and (orientation: landscape)`,
  tabletFrom:       `@media (min-width: ${breakpoints.tablet}px)`,
  desktop:          `@media (min-width: ${breakpoints.desktop}px)`,
  desktopLarge:     `@media (min-width: ${breakpoints.hd}px)`,
  desktopXLarge:    `@media (min-width: ${breakpoints.fhd}px)`,
}

/* SPACING
--------------------------------------------------------------- */

export const spacing = {
  '3xs': 2,
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 60,
  '6xl': 80,
  '8xl': 100,
};

/* DIMENSIONS
--------------------------------------------------------------- */

export const dimensions = {
  indexPageWidth: '1920px',
  storePageWidth: '1920px',
  sidePanelMaxwidth: '280px',
  navHeightDesktop: '180px',
  navHeightTablet: '96px',
  navHeightMobile: '68px',
  cartWidthDesktop: '480px',
  pictureBrowserAction: {
    widthDesktop: '200px',
    heightMobile: '80px'
  }
};

/* HEADER
--------------------------------------------------------------- */

export const headerHeight = {
  phone: '68px',
  tablet: '96px',
  desktop: '180px',
}

/* LOGO
--------------------------------------------------------------- */

export const logoHeight = {
  phone: '24px',
  tablet: '48px',
  desktop: '60px'
}

/* TYPOGRAPHY
--------------------------------------------------------------- */

export const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif'
].join();

const monospaceFontStack = [
  `Space Mono`,
  `SFMono-Regular`,
  `Menlo`,
  `Monaco`,
  `Consolas`,
  `Liberation Mono`,
  `Courier New`,
  `monospace`
].join();

export const fontFamily = {
  body: `Source Sans Pro, ${defaultFontStack}`,
  heading: `Fira Sans Condensed, ${defaultFontStack}`,
  monospace: monospaceFontStack
};

const fontSize = {
  h1: {
    mobile: '1.75rem',
    desktop: '3rem'
  },
  h2: {
    mobile: '1.5rem',
    desktop: '2rem'
  },
  h3: {
    mobile: '1.25rem',
    desktop: '1.5rem'
  },
  h4: {
    mobile: '1.125rem',
    desktop: '1.25rem'
  },
  headline: '1rem',
  body: '1rem',
  smallbody: '0.875rem',
  subtext: '0.75rem'
}

const lineHeight = {
  h1: '64px',
  h2: '48px',
  h3: '36px',
  h4: '24px',
  headline: '24px',
  body: '24px',
  smallbody: '24px',
  subtext: '20px'
}

export const fontWeight = {
  heading: {
    normal: 400,
    medium: 500,
    bold: 600,
  },
  body: {
    normal: 400,
    medium: 600,
    bold: 700,
  }
}

const headingLetterSpacing = '0.5px';

/* HEADING
--------------------------------------------------------------- */

const headingCommonStyle = (`
  color: ${colors.mainDark};  
  font-family: ${fontFamily.heading};
  font-weight: ${fontWeight.heading.medium};
  letter-spacing: ${headingLetterSpacing};
  margin: 0;
`);

const bodyCommonStyle = (`
  color: ${colors.mainDark};  
  font-family: ${fontFamily.body};
  font-weight: ${fontWeight.body.normal};
`);

export const H1 = styled(`h1`)`
  ${headingCommonStyle}
  font-size: ${fontSize.h1.mobile};
  line-height: ${lineHeight.h1};

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: ${fontSize.h1.desktop};
  }
`;

export const H2 = styled(`h2`)`
  ${headingCommonStyle}
  font-size: ${fontSize.h2.mobile};
  line-height: ${lineHeight.h2};

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: ${fontSize.h2.desktop};
  }
`;

export const H3 = styled(`h3`)`
  ${headingCommonStyle}
  font-size: ${fontSize.h3.mobile};
  line-height: ${lineHeight.h3};

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: ${fontSize.h3.desktop};
  }
`;

export const H4 = styled(`h4`)`
  ${headingCommonStyle}
  font-size: ${fontSize.h4.mobile};
  line-height: ${lineHeight.h4};

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: ${fontSize.h4.desktop};
  }
`;

const fontStyleHeadline = styled(`span`)`
  ${headingCommonStyle}
  font-size: ${fontSize.headline};
  line-height: ${lineHeight.headline};
`;

const fontStyleBody = styled(`span`)`
  ${bodyCommonStyle}
  font-size: ${fontSize.body};
  line-height: ${lineHeight.body};
`;

const fontStyleSmallbody = styled(`span`)`
  ${bodyCommonStyle}
  font-size: ${fontSize.smallbody};
  line-height: ${lineHeight.smallbody};
`;

const fontStyleSubtext = styled(`span`)`
  ${bodyCommonStyle}
  font-size: ${fontSize.subtext};
  line-height: ${lineHeight.subtext};
`;

export const FontStyle = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  headline: fontStyleHeadline,
  body: fontStyleBody,
  smallbody: fontStyleSmallbody,
  subtext: fontStyleSubtext
};

/* OTHERS
--------------------------------------------------------------- */

export const radius = {
  default: 2,
  large: 5
};

export const scrollbarStyles = {
  WebkitOverflowScrolling: `touch`,
  '&::-webkit-scrollbar': { width: `6px`, height: `6px` },
  '&::-webkit-scrollbar-thumb': { background: colors.neutral2 },
  '&::-webkit-scrollbar-thumb:hover': { background: colors.mainClickable },
  '&::-webkit-scrollbar-track': { background: colors.brandLight }
};

const simpleEntry = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const deadSimpleEntry = keyframes`
  from {
    opacity: .25;
  }
`;

const overlay = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const animations = {
  simpleEntry: `${simpleEntry} .75s ease forwards`,
  deadSimpleEntry: `${deadSimpleEntry} .5s ease forwards`,
  maskOverlay: `${overlay} .75s ease-in-out forwards`,
};

export const shadow = {
  blockItemShadow: '0 16px 40px -12px rgba(0,0,0,0.2)',
  navShadow: '0px 12px 40px -12px rgba(9,13,23,0.08)',
}