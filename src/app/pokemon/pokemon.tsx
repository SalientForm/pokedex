import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { PokemonProvider } from './state/pokemon/pokemon-provider';
import { pokemonIndexActions, selectSelectedPokemonId } from '../pokedex/state/pokemon-index/pokemon-index.slice';
import { addPokemonViewHistoryItemByPokemonId } from '../pokedex/state/pokemon-view-history/pokemon-view-history.slice';
import PokedexViewHistory from '../pokedex/view-history/pokedex-view-history';
import { PokedexDispatch } from '../state/root-store';
import PokemonDetail from './detail/pokemon-detail';
import styles from './pokemon.module.scss';

/* eslint-disable-next-line */
export interface PokemonProps {}

export function Pokemon(props: PokemonProps) {
  const { id: pokemonIdUrlParam } = useParams();
  const selectedPokemonId = useSelector(selectSelectedPokemonId);
  // param value is priority
  const pokemonId = pokemonIdUrlParam ? parseInt(pokemonIdUrlParam) : selectedPokemonId ?? 1;
  const dispatch = useDispatch<PokedexDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(pokemonIndexActions.setSelectedPokemon(pokemonId));
    dispatch(addPokemonViewHistoryItemByPokemonId(pokemonId));
    if (!pokemonIdUrlParam) {
      navigate(`pokemon/detail/${pokemonId}`, { replace: true });
    }
  }, [navigate]);

  return (
    <div className={styles['container']}>
      <PokemonProvider>
        <PokemonDetail></PokemonDetail>
      </PokemonProvider>
      <PokedexViewHistory></PokedexViewHistory>
    </div>
  );
}

export default Pokemon;
