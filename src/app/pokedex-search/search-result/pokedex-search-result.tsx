import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonIndexActions, selectPokemonFromIndexByName } from '../../state/pokemon-index/pokemon-index.slice';
import { PokedexDispatch } from '../../state/root-store';
import { addViewHistoryItemByPokemonId } from '../../state/view-history/view-history.slice';
import PokemonSummaryCard from '../pokemon-summary-card/pokemon-summary-card';
import styles from './pokedex-search-result.module.scss';

export interface PokedexSearchResultProps {
  searchText: string;
}

export function PokedexSearchResult(props: PokedexSearchResultProps) {
  const dispatch = useDispatch<PokedexDispatch>();
  const handleClickPokemonCard = (pokemonId: number) => {
    dispatch(pokemonIndexActions.setSelectedPokemon(pokemonId));
    dispatch(addViewHistoryItemByPokemonId(pokemonId));
  };
  const searchResults$ = useSelector(selectPokemonFromIndexByName(props.searchText));

  return (
    <Card className={styles['container']}>
      <div className={`${styles['title']}`}>Search Results</div>
      <div className={`${styles['results']}`}>
        {searchResults$.map((result) => (
          <PokemonSummaryCard
            onClick={handleClickPokemonCard}
            className={'p-2 m-2'}
            key={result.item.id}
            pokemonId={result.item.id}
            pokemonName={result.item.name}
          ></PokemonSummaryCard>
        ))}
        {searchResults$.length === 0 ? <div>(No results found.)</div> : null}
      </div>
    </Card>
  );
}

export default PokedexSearchResult;
