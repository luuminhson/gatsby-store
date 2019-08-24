// @flow
import React from 'react';
import styles from './Icon.module.scss';

type Props = {
  icon: {
    viewBox?: string,
    path?: string 
  },
  className: string
};

const Icon = ({ icon, className }: Props) => (
  <svg className={[styles['icon'], className].join(' ')} viewBox={icon.viewBox}>
    <path d={icon.path} />
  </svg>
);

export default Icon;
