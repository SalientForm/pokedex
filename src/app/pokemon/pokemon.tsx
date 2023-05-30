import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { PokemonProvider } from "../common/providers/pokemon-provider";
import { pokemonIndexActions } from "../pokedex/state/pokemon-index/pokemon-index.slice";
import { addPokemonViewHistoryItemByPokemonId } from "../pokedex/state/pokemon-view-history/pokemon-view-history.slice";
import PokedexViewHistory from "../pokedex/view-history/pokedex-view-history";
import { PokedexDispatch } from "../state/root-store";
import PokemonDetail from "./detail/pokemon-detail";
import styles from './pokemon.module.scss';

/* eslint-disable-next-line */
export interface PokemonProps {}

export function Pokemon(props: PokemonProps) {
  const { id: pokemonIdUrlParam } = useParams();
  const pokemonId = (pokemonIdUrlParam) ? parseInt(pokemonIdUrlParam) : 1 ;
  const dispatch = useDispatch<PokedexDispatch>();

  if(pokemonId) {
    dispatch(pokemonIndexActions.setSelectedPokemon(pokemonId));
    dispatch(addPokemonViewHistoryItemByPokemonId(pokemonId));
  }

  return (
    <div className={styles['container']}>
      <PokemonProvider><PokemonDetail></PokemonDetail></PokemonProvider>
      <PokedexViewHistory></PokedexViewHistory>
    </div>
  );
}

export default Pokemon;
