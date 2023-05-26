import styles from './header.module.scss';

export function Header() {
  return (
    <div className={styles['container']}>
      <div className={styles['title']}>Pokédex</div>
    </div>
  );
}

export default Header;
