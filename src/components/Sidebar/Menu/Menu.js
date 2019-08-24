// @flow
import React from 'react';
import { Link } from '../../LinkWithPrev';
import styles from './Menu.module.scss';

type Props = {
  menu: {
    label: string,
    path: string
  }[],
  className: string
};

const Menu = ({ menu, className }: Props) => (
  <nav className={[
    styles['menu'],
    className
  ].join(' ')}>
    <ul className={styles['menu__list']}>
      {menu.map((item) => (
        <li className={styles['menu__list-item']} key={item.path}>
          <Link
            to={item.path}
            className={styles['menu__list-item-link']}
            activeClassName={styles['menu__list-item-link--active']}
            partiallyActive={item.path === '/' ? false : true}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Menu;
