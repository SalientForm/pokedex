import { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import { PokemonContext } from '../../../common/providers/pokemon-provider';
import { PokemonEntity } from '../../state/pokemon/pokemon.slice';
import styles from './pokemon-summary-detail.module.scss';

const getAbilities = (pokemon: PokemonEntity) => {
  return (
    <div className={`${styles['abilities']}`}>
      {pokemon?.abilities
        ?.filter((i) => !i.is_hidden)
        .map((item, index) => (
          <Badge key={item.ability.name} bg='secondary' className={styles[`badge`]}>
            {item.ability.name}
          </Badge>
        ))}
    </div>
  );
};

export function PokemonSummaryDetail(props: { title?: string }) {
  const pokemon$ = useContext(PokemonContext);

  if (!pokemon$) {
    return <div className={styles['message']}>(No pokemon selected.)</div>;
  }

  return (
    <div className={styles['container']}>
      {props.title ? <div className={styles['card-title']}>{props.title}</div> : ''}
      <div className={styles['primary-image']}>
        {pokemon$?.sprites?.front_default ? <img alt={pokemon$.name} src={pokemon$?.sprites?.front_default} /> : null}
      </div>
      <div className={`${styles['card-title']}`}>
        <div className={`${styles['name']}`}>{`${pokemon$.name}`}</div>
        <div>{`#${pokemon$?.id.toString().padStart(4, '0')}`}</div>
      </div>
      <div className={`${styles['abilities']}`}>{getAbilities(pokemon$)}</div>
    </div>
  );
}

export default PokemonSummaryDetail;
