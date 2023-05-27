import styles from './pokemon-summary-detail.module.scss';
import { useSelector } from 'react-redux';
import { selectSelectedPokemon } from '../../../pokedex/search/state/pokemon-index/pokemon-index.slice';
import { Badge, Card } from 'react-bootstrap';
import { PokemonEntity } from '../../state/pokemon/pokemon.slice';

const getAbilities = (pokemon: PokemonEntity) => {
  return pokemon.abilities?.map((item) => (
    <Badge key={item.ability.name} bg='secondary' className={styles[`badge`]}>
      {item.ability.name}
    </Badge>
  ));
};

export function PokemonSummaryDetail() {
  const pokemon$ = useSelector(selectSelectedPokemon);

  return (
    <Card className={styles['container']}>
      <div className={styles['title']}>Pokemon</div>
      {!pokemon$ ? (
        <div className={styles['message']}>(No pokemon selected.)</div>
      ) : (
        <div className={styles['detail']}>
          <div className={styles['primary-image']}>
            {pokemon$?.sprites?.front_default ? (
              <img alt={pokemon$.name} src={pokemon$?.sprites?.front_default} />
            ) : null}
          </div>
          <div className={`${styles['card-title']}`}>
            <div>
              <strong>{`${pokemon$.name}`}</strong>
            </div>
            <div>{`#${pokemon$?.id.toString().padStart(4, '0')}`}</div>
          </div>
          <div className={`${styles['abilities']}`}>{getAbilities(pokemon$)}</div>
        </div>
      )}
    </Card>
  );
}

export default PokemonSummaryDetail;
