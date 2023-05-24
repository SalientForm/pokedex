import styles from './header.module.scss';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div className={styles['header']}>
      <div className={styles['title']}>Pokédex Search</div>
    </div>
  );
}

export default Header;
