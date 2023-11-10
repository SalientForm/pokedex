import { Card } from "react-bootstrap";
import styles from './pokemon-thumb.module.scss';

/* eslint-disable-next-line */
export interface PokemonThumbProps {}

export function PokemonThumb(props: PokemonThumbProps) {
  return (
    <Card className={styles['container']}>
      <p>Pokemon</p>
    </Card>
  );
}

export default PokemonThumb;
