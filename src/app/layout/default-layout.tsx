import styles from './default-layout.module.scss';
import PokedexSearch from '../pokedex-search/pokedex-search';
import Header from './header/header';

export function DefaultLayout() {
  return (
    <div className={styles['container']}>
      <Header></Header>
      <div className={styles['main-content']}>
        <PokedexSearch />
      </div>
    </div>
  );
}

export default DefaultLayout;
