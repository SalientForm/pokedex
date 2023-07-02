import { useSelector } from 'react-redux';
import { PokemonProvider } from '../pokemon/state/pokemon/pokemon-provider';
import PokemonSummaryCard from '../pokemon/summary-card/pokemon-summary-card';
import styles from './pokedex.module.scss';
import PokedexSearch from './search/pokedex-search';
import { selectSelectedPokemonId } from './state/pokemon-index/pokemon-index.slice';
import { PokemonViewHistoryEntity } from './state/pokemon-view-history/pokemon-view-history.slice';
import PokedexViewHistory from './view-history/pokedex-view-history';

export function Pokedex() {
  const pokemonId$ = useSelector(selectSelectedPokemonId);
  const onClickViewHistoryItem = (viewItem: PokemonViewHistoryEntity) => {};

  return (
    <div className={styles['container']}>
      <div className={'flex-grow-1'}>
        <PokedexSearch />
      </div>
      <div className={'ms-3 flex-shrink-0'}>
        <PokemonProvider pokemonId={pokemonId$}>
          <PokemonSummaryCard className={'mb-2'} title={'Last viewed'} />
        </PokemonProvider>
        <PokedexViewHistory onClickViewHistoryItem={onClickViewHistoryItem} />
      </div>
    </div>
  );
}

export default Pokedex;
