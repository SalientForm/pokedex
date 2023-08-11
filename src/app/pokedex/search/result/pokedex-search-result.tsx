import { useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PokemonProvider } from '../../../pokemon/state/pokemon/pokemon-provider';
import PokemonSummaryCard from '../../../pokemon/summary-card/pokemon-summary-card';
import { selectPokemonFromIndexByName } from '../../state/pokemon-index/pokemon-index.slice';
import styles from './pokedex-search-result.module.scss';

export interface PokedexSearchResultProps {
  searchText: string;
}

export function PokedexSearchResult(props: PokedexSearchResultProps) {
  const navigate = useNavigate();
  const searchResults$ = useSelector(selectPokemonFromIndexByName(props.searchText));

  const handleClickPokemonCard = useCallback(
    (pokemonId: number) => {
      navigate(`/pokemon/detail/${pokemonId}`);
    },
    [navigate]
  );

  return (
    <Card className={styles['container']}>
      <div className={styles['content']}>
        <div className={`${styles['title']}`}>Search Results</div>
        <div className={`${styles['results']}`}>
          {searchResults$.map((result) => (
            <PokemonProvider key={result.item.id} pokemonId={result.item.id}>
              <PokemonSummaryCard
                onClick={handleClickPokemonCard}
                className={'p-2 m-2'}
                rolloverEffect={true}
              ></PokemonSummaryCard>
            </PokemonProvider>
          ))}
          {searchResults$.length === 0 ? <div>(No results found.)</div> : null}
        </div>
      </div>
    </Card>
  );
}

export default PokedexSearchResult;
