import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../LinkWithPrev';
import { fontFamily, colors } from '../../utils/styles';

const ButtonLink = styled(Link)`
  font-family: ${fontFamily.heading};
  color: ${colors.mainClickable};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .046854em;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0 12px;
  display: inline-flex;
  position: relative;
  min-width: 48px;
  height: 36px;
  border: none;
  outline: none;
  line-height: 36px;  
  overflow: hidden;
  vertical-align: middle;
  background-color: transparent;
  border-radius: 3px;
  user-select: none;
  -webkit-appearance: none;

  &:hover,
  &:focus {
    cursor: pointer;
    color: ${colors.mainClickable};
    background-color: rgba(${colors.mainClickable},0.04);
  }

  &:active {
    background-color: rgba(${colors.mainClickable},0.12);
  }
`;

const onDarkStyle = css`
  &:hover,
  &:focus,
  &:active {
    background-color: rgba(${colors.white},0.08);
  }
`;

const PureButton = ({ link, rel, label, state, className, onDark }) => (
  <div className={className} >
    <ButtonLink css={onDark && onDarkStyle} state={state} to={link} rel={rel}>{label}</ButtonLink>
  </div>
);

const Button = (props) => (
  <PureButton {...props} />
);

export default Button;
