import { Card } from "react-bootstrap";
import styles from './pokemon-thumb.module.scss';

/* eslint-disable-next-line */
export interface PokemonThumbProps {}

export function PokemonThumb(props: PokemonThumbProps) {
  return (
    <div className={styles['container']}>
      <p>Pokemon</p>
    </div>
  );
}

export default PokemonThumb;
