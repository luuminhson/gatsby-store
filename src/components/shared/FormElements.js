import styled from '@emotion/styled';

import { PrimaryButton } from './Buttons';

import { colors, radius, spacing } from '../../utils/styles';

export const Input = styled(`input`)`
  background-color: ${colors.white};
  border: 1px solid ${colors.neutral2};
  border-radius: ${radius.large}px;
  color: ${colors.mainDark};
  display: block;
  font-size: 1.1rem;
  padding: ${spacing.sm}px ${spacing.md}px;
  width: 100%;
  -webkit-appearance: none;

  :focus {
    box-shadow: 0 0 0 3px ${colors.mainHighlight};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }
`;

export const Select = styled(Input.withComponent('select'))`
  appearance: none;
  /* stylelint-disable */
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23${colors.neutral3.substr(
    1
  )}' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
  /* stylelint-enable */
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 8px 10px;
  padding-right: ${spacing.xl}px !important;
`;

export const Fieldset = styled(`fieldset`)`
  border: none;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  padding: 0;
`;

export const Label = styled(`label`)`
  color: ${colors.textLight};
  display: flex;
  font-size: 1rem;
  padding: ${spacing.xs}px;
`;

export const Submit = styled(PrimaryButton)`
  font-size: 1.25rem;
  width: 100%;
`;
