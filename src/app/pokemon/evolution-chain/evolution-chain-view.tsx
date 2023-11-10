import styles from './evolution-chain-view.module.scss';
import PokemonThumb from "./pokemon-thumb/pokemon-thumb";

/* eslint-disable-next-line */
export interface EvolutionChainProps {}

export function EvolutionChainView(props: EvolutionChainProps) {
  return (
    <div className={styles['container']}>
      <PokemonThumb></PokemonThumb>
      <PokemonThumb></PokemonThumb>
    </div>
  );
}

export default EvolutionChainView;
